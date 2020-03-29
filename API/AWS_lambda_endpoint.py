import json

def calculate(income, children, marital_status):
	check = 1200 * marital_status
	cap = 75000 * marital_status

	if income > cap:
		check = check - ((income-cap) / 100 * 5)
	if income == 0:
		check = 600 * marital_status

	check = check + children * 600
	print(check)
	return {'checkTotal': check}


def lambda_handler(event, context):
    '''Demonstrates a simple HTTP endpoint using API Gateway. You have full
    access to the request and response payload, including headers and
    status code.
    '''
    print("Received event: " + json.dumps(event, indent=2))
    marital_status = int(event["queryStringParameters"]["marital_status"])
    income = int(event["queryStringParameters"]["income"])
    children = int(event["queryStringParameters"]["children"])
    return calculate(income, children, marital_status)
