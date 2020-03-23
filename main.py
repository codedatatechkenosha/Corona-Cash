from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class Check(Resource):
	def get(self):
		marital_status = request.args.get('marital_status', default=1, type=int)
		children = request.args.get('children', default=0, type=int)
		income = request.args.get('income', default=0, type=int)

		check = 1200 * marital_status
		cap = 75000 * marital_status

		if income > cap:
			check = check - ((income-cap) / 100 * 5)
		if income == 0:
			check = 600 * marital_status

		check = check + children * 600
		return {'checkTotal': check}

api.add_resource(Check, '/')

if __name__ == '__main__':
	app.run(debug=True)