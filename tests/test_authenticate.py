import pytest

from app import create_app
from extensions import db


@pytest.fixture
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"
    })

    # Re-init DB in test context
    with app.app_context():
        db.drop_all()
        db.create_all()

    yield app


@pytest.fixture
def client(app):
    return app.test_client()


def test_authenticate_yes_does_not_crash(client):
    # First load index to get correct route and session
    r = client.get('/')
    assert r.status_code == 200

    # POST answer yes should redirect to /welcome and not return 500
    r = client.post('/authenticate', data={'answer': 'yes'}, follow_redirects=False)
    assert r.status_code in (302, 303)
    assert '/welcome' in r.headers.get('Location', '')
