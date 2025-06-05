from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = {}
balances = {}

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    phone = data.get('phone')
    password = data.get('password')

    if not phone or not password:
        return jsonify({'success': False, 'msg': 'Phone and password required.'}), 400

    if phone in users:
        return jsonify({'success': False, 'msg': 'User already exists.'}), 400

    users[phone] = password
    balances[phone] = 0
    return jsonify({'success': True, 'msg': 'Registration successful.'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    phone = data.get('phone')
    password = data.get('password')

    if users.get(phone) == password:
        return jsonify({'success': True, 'msg': 'Login successful.', 'balance': balances.get(phone, 0)})
    else:
        return jsonify({'success': False, 'msg': 'Invalid credentials.'}), 401

@app.route('/balance/update', methods=['POST'])
def update_balance():
    data = request.json
    phone = data.get('phone')
    amount = data.get('amount')

    if phone not in users:
        return jsonify({'success': False, 'msg': 'User not found.'}), 404

    try:
        amount = float(amount)
    except:
        return jsonify({'success': False, 'msg': 'Invalid amount.'}), 400

    balances[phone] = balances.get(phone, 0) + amount
    return jsonify({'success': True, 'msg': f'Balance updated. New balance: {balances[phone]}'})

if __name__ == '__main__':
    app.run(debug=True)
