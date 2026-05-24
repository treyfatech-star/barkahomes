"""
Backend API tests for Barka Royal Homes (contact + newsletter endpoints).
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else None
# Fallback: read from frontend .env
if not BASE_URL:
    from pathlib import Path
    env = Path("/app/frontend/.env").read_text()
    for line in env.splitlines():
        if line.startswith("REACT_APP_BACKEND_URL="):
            BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
            break

API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"


# ---------- Contact ----------
class TestContact:
    def test_create_contact_and_persist(self, client):
        payload = {
            "name": "TEST_User",
            "email": f"TEST_{uuid.uuid4().hex[:8]}@example.com",
            "phone": "+234 800 000 0000",
            "message": "Looking for a 4-bedroom in Abuja.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code in (200, 201), r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert "id" in data and isinstance(data["id"], str)
        assert "created_at" in data

        # Verify persistence via GET list
        list_r = client.get(f"{API}/contact")
        assert list_r.status_code == 200
        emails = [c["email"] for c in list_r.json()]
        assert payload["email"] in emails

    def test_create_contact_invalid_email(self, client):
        r = client.post(
            f"{API}/contact",
            json={"name": "x", "email": "not-an-email", "message": "hi"},
        )
        assert r.status_code == 422

    def test_create_contact_missing_fields(self, client):
        r = client.post(f"{API}/contact", json={"email": "a@b.com"})
        assert r.status_code == 422

    def test_list_contacts(self, client):
        r = client.get(f"{API}/contact")
        assert r.status_code == 200
        assert isinstance(r.json(), list)


# ---------- Newsletter ----------
class TestNewsletter:
    def test_subscribe_and_idempotent(self, client):
        email = f"TEST_{uuid.uuid4().hex[:8]}@example.com"
        r1 = client.post(f"{API}/newsletter", json={"email": email})
        assert r1.status_code in (200, 201), r1.text
        d1 = r1.json()
        assert d1["email"] == email
        assert "id" in d1

        # Idempotent — second call same email should not error
        r2 = client.post(f"{API}/newsletter", json={"email": email})
        assert r2.status_code in (200, 201), r2.text
        d2 = r2.json()
        assert d2["email"] == email
        assert d2["id"] == d1["id"], "Idempotency: existing record should be returned"

    def test_subscribe_invalid_email(self, client):
        r = client.post(f"{API}/newsletter", json={"email": "not-email"})
        assert r.status_code == 422

    def test_list_newsletter(self, client):
        r = client.get(f"{API}/newsletter")
        assert r.status_code == 200
        assert isinstance(r.json(), list)
