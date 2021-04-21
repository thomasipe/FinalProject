import psycopg2
import sys
import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from  flask import Flask,render_template
from flask import jsonify, request

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

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

        
    # loaded_model = pickle.load(open('stroke_machine_learning.sav', 'rb'))
    # individual_test = np.array([[  0.  ,  60.  ,   0.  ,   0.  ,   1.  ,   1.  ,   0.  , 380.12,
    #     23.5 ,   1.  ]])
    # prediction = loaded_model.predict_proba(individual_test)
    # pred_string = str(prediction[0][1])
    # return pred_string

if __name__ == "__main__":
    app.run(debug=True)