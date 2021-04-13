echo "> Recreating database: masterdb"
echo "> Please enter password for the user: root"
psql -U root -W -p 5003 -h 127.0.0.1 -e  -d masterdb -f ./db/Master-2021_04_08_21_59_51-dump.sql
echo "> Database successfully recreated: masterdb"

