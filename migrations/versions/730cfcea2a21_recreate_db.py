"""recreate db

Revision ID: 730cfcea2a21
Revises: 
Create Date: 2020-06-15 12:57:51.769636

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '730cfcea2a21'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('result',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('expr', sa.String(), nullable=True),
    sa.Column('answer', sa.Float(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('result')
    # ### end Alembic commands ###