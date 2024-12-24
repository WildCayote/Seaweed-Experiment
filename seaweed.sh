# start a master server on port 1111 and with a directory of 'master'
./weed master -mdir=./master -volumeSizeLimitMB=1024 -port=1111 &

# start a volume server on port 2222 and with a directory of 'volume'
./weed volume -mserver=localhost:1111 -dir=./volume1 -port=2222 &
./weed volume -mserver=localhost:1111 -dir=./volume2 -port=2223 &

# start a filer and S3 at port 3333
./weed filer -s3 -s3.config=./s3_config.json -s3.port=3333 -master=localhost:1111 &