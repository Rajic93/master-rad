from flask_sqlalchemy import SQLAlchemy


def init_app(app):
    db = SQLAlchemy(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://root:root@localhost:5003/masterdb'
    db.init_app(app)
    return db