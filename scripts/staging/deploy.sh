cp .env.stage .env
serverless deploy --aws-profile tavour_stage -s stage -v
