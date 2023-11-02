docker build -t aleexts/systemdynamicsui .
docker run -d --rm -p 5173:5173 --name front aleexts/systemdynamicsui