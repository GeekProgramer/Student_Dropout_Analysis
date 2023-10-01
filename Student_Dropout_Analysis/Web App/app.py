from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def main():


    
    return render_template('index.html')


@app.route('/analysis.html')
def analysis():
    return render_template('analysis.html')

@app.route('/index.html')
def index():
    return render_template('index.html')

app.run(debug=True)