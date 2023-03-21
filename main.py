from flask import Flask
from flask_restx import Api
from flask_cors import CORS
from analysis import analysis_namespace



def create_app():
    app=Flask(__name__, static_url_path="/")

    CORS(app)

    api=Api(app, doc='/')

    api.add_namespace(analysis_namespace)

    return app
