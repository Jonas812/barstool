#1 Im Web

	jonasneu.de:5000


#2 Manuell Nodejs

	1. Node.js installieren 

	https://nodejs.org/en/download/


	2. In den Projektordner navigieren

	Befehle ausführen:

	npm install
	npm run dev


	3. Im Browser über die nach 'npm run dev' im Terminal zurückgegebene URL öffnen
	Wahrscheinlich http://localhost:5174/


#2 Über Docker

	1. Docker installieren

	https://docs.docker.com/get-docker/

	2. In den Projektordner navigieren

	Befehle ausführen:
	docker build -t htw-barstool:0.0.1 .
	docker run -p 5000:5000 htw-barstool:0.0.1
	
