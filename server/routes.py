from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
from extensions import db  

routes = Blueprint('routes', __name__)

@routes.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Email and password are required'}), 400

    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        return jsonify({
            'message': 'Login successful',
            'role': user.role,
            'userId': user.userId,
            'email': user.email
        }), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401


@routes.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data or not data.get('email') or not data.get('password') or not data.get('role'):
        return jsonify({'message': 'Email, password, and role are required'}), 400

    email = data['email']
    password = data['password']
    role = data['role']

    # Prevent registration with invalid roles (optional, but recommended)
    if role not in ['student', 'admin']:
        return jsonify({'message': 'Invalid role'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already registered'}), 400

    hashed_password = generate_password_hash(password)

    new_user = User(email=email, password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201
