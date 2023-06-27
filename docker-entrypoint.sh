#!/bin/bash
set -e
export MONGO_URL="mongodb://$MONGO_USER:$MONGO_PASS@$MONGO_HOST:$MONGO_PORT"
echo $MONGO_URL
exec $@