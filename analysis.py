from flask_restx import Namespace, Resource
from flask import request
import PyPDF2
from keybert import KeyBERT
from nltk.tokenize import sent_tokenize


analysis_namespace=Namespace('analysis', description='File analysis & backend handshake')

@analysis_namespace.route("/handshake")
class HandshakeResource(Resource):
    def get(self):
        """
            Return successful connection
        """

        return { "message": "Connection successful" }


@analysis_namespace.route('/pdfreader')
class PDFResource(Resource):
    def post(self):
        """
            Return text from PDF
        """

        file = request.files['file_from_react']
      
        if not file:
            return 'No file uploaded.'

        pdfReader = PyPDF2.PdfReader(file)

        pageObj = pdfReader.pages[0]

        return pageObj.extract_text(), 201


@analysis_namespace.route('/keywords')
class KeywordResource(Resource):
    def post(self):
        """
            Return keywords from text
        """

        data=request.get_json()
        
        text=data['text']

        sentences = sent_tokenize(text)

        analysis = []
        analysiscsv = []
        list = []

        kw_model = KeyBERT()

        for sentence in sentences:
            keywords = kw_model.extract_keywords(sentence, keyphrase_ngram_range=(1, 1), stop_words=None, highlight=True)
            analysis.append(keywords)
      
        seen = set()

        for item in analysis:
            for d in item:
                analysiscsv.append({ "word": d[0], "value": d[1] })

        words = [item['word'] for item in analysiscsv]

        frequency = {word: words.count(word) for word in words}

        for item in analysiscsv:
            if frequency[item['word']] > 1:
                item['value'] = item['value'] * 2

        index = 0

        for item in analysiscsv:
            analysiscsv.sort(key=lambda x: float(x['value']), reverse=True)
            if item['word'] not in seen:
                list.append({ "word": item['word'], "value": item['value'], "index": index })
                seen.add(item['word'])
                index += 1

        return list
    