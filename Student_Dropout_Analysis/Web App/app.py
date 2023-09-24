from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def main():
    return render_template('index.html')


@app.route('/analysis.html')
def index():
    return render_template('analysis.html')


app.run(debug=True)