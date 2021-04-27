import psycopg2
import sys
import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier

from flask import Flask, render_template, url_for
from flask import jsonify, request
app = Flask(__name__)

posts = [
		{
			'author': 'Ryan',
			'title': 'Data Scientist',
			'content': 'ML Model Creator',
			'date_posted': 'April 20, 2021'
		},
		{
			'author': 'Julie',
			'title': 'Tableau Expert',
			'content': 'Tableau Charts',
			'date_posted': 'April 20, 2021'
		},
		{
			'author': 'Tom',
			'title': 'Flask Flunkie',
			'content': 'Web site created',
			'date_posted': 'April 20, 2021'
		},
]


@app.route('/')
@app.route('/home')
def home():
    return render_template('home.html', posts=posts)

@app.route('/about')
def about():
    return render_template('about.html', title='About')

@app.route('/charts')
def charts():
    return render_template('charts.html', title='Charts')

@app.route('/notebook')
def notebook():
    return render_template('notebook.html', title='Jupyter Notebook')

@app.route('/tom')
def tom():
    return render_template('tom.html', title='tom')


# Ryans stuff

@app.route("/predictor")
def index():
    return render_template("predictor.html")

@app.route("/individual_prediction", methods=['GET', 'POST']) 
def individual_prediction():

        # POST request
    if request.method == 'POST':
        print('Incoming..')
        individual_test = request.get_json()
        loaded_model = pickle.load(open('stroke_machine_learning.sav', 'rb'))
        prediction = loaded_model.predict_proba(individual_test['data'])
        pred_string = str(prediction[0][1])

        return pred_string

    # GET request
    else:
        loaded_model = pickle.load(open('stroke_machine_learning.sav', 'rb'))
        individual_test = np.array([[  0.  ,  60.  ,   0.  ,   0.  ,   1.  ,   1.  ,   0.  , 380.12,
            23.5 ,   1.  ]])
        prediction = loaded_model.predict_proba(individual_test)
        pred_string = str(prediction[0][1])
        return pred_string


if __name__ == '__main__':
	app.run(debug=True)
	