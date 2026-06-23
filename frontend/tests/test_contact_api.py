"""Backend API tests for Sahuja Interiors - contact, contacts, root."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://sahuja-portfolio.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health check
class TestRoot:
    def test_root_ok(self, session):
        r = session.get(f"{API}/", timeout=20)
        assert r.status_code == 200
        data = r.json()
        assert "message" in data


# Contact creation
class TestContactCreate:
    def test_create_valid_contact(self, session):
        payload = {
            "name": "TEST_Reviewer",
            "email": "test_reviewer@example.com",
            "phone": "+91-9999999999",
            "address": "abc area, Jharkhand",
            "message": "Hello, I'd like a quote for my apartment."
        }
        r = session.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["address"] == payload["address"]
        assert data["message"] == payload["message"]
        assert "id" in data and len(data["id"]) > 0
        assert "_id" not in data
        assert "created_at" in data

    def test_create_missing_email(self, session):
        payload = {"name": "TEST_NoEmail", "message": "hello"}
        r = session.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 422

    def test_create_invalid_email_format(self, session):
        payload = {"name": "TEST_BadEmail", "email": "not-an-email", "message": "hello"}
        r = session.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 422

    def test_create_empty_message(self, session):
        payload = {"name": "TEST_EmptyMsg", "email": "empty@example.com", "message": ""}
        r = session.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 422

    def test_create_missing_name(self, session):
        payload = {"email": "noname@example.com", "message": "hi"}
        r = session.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 422

    def test_create_without_phone(self, session):
        payload = {
            "name": "TEST_NoPhone",
            "email": "nophone@example.com",
            "message": "Phone optional check"
        }
        r = session.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 201
        data = r.json()
        assert data["phone"] is None


# Contact listing + ObjectId leakage check
class TestContactList:
    def test_list_contacts_no_objectid(self, session):
        # Seed one contact to ensure list non-empty
        session.post(f"{API}/contact", json={
            "name": "TEST_ListSeed",
            "email": "list_seed@example.com",
            "message": "seed"
        }, timeout=20)
        time.sleep(0.3)
        r = session.get(f"{API}/contacts", timeout=20)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert len(items) >= 1
        for item in items:
            assert "_id" not in item, f"MongoDB _id leaked: {item}"
            assert "id" in item
            assert "email" in item
        # verify TEST_ListSeed present
        assert any(i.get("name") == "TEST_ListSeed" for i in items)
