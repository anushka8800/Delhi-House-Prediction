from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/')
@app.route('/get_furnishing_status')
def get_furnishing_status():
    response = jsonify({
        'furnishing_status' : util.get_furnishing_status()
    })
    response.headers.add('Access-Control-Allow-Origin','*')

    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    area = float(request.form['area'])
    bhk = int(request.form['bhk'])
    bathroom = int(request.form['bathroom'])
    parking = int(request.form['parking'])
    furnishing_status = request.form['furnishing_status']

    response = jsonify({
        'estimated_price': util.get_price(area,bhk,bathroom,parking,furnishing_status)
    })

    response.headers.add('Access-Control-Allow-Origin','*')

    return response

if __name__ == "__main__":
    print("starting python flask server for delhi house prediction...")
    util.load_saved_artifacts()
    app.run()