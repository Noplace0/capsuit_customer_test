from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import json
import mysql.connector
from decimal import Decimal


class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return str(obj)
        return super(JSONEncoder, self).default(obj)


db = mysql.connector.connect(host='127.0.0.1',
                             user='root',
                             passwd='for-root-test-only',
                             db='classicmodels',
                             port=3306)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.json_encoder = JSONEncoder


@app.route('/customers')
@cross_origin()
def list_customers():
    first_name = request.args.get('first_name')
    last_name = request.args.get('last_name')
    cursor = db.cursor(dictionary=True)
    sql = "SELECT * FROM customers WHERE contactFirstName LIKE %s AND contactLastName LIKE %s ORDER BY creditLimit DESC"
    cursor.execute(sql, ('%' + first_name + '%', '%' + last_name + '%'))
    results = cursor.fetchall()
    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)
