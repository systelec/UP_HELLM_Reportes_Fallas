#!/bin/bash
push=false

function apigithub()
{
	API_RESPONSE=$(curl -u "systelec:sysa5450" https://api.github.com/repos/systelec/UT_HELLM_Reportes_Fallas/branches/master)
	repo=$( echo $API_RESPONSE | python -c "import sys, json; print json.load(sys.stdin)")

		name=$( echo $API_RESPONSE | python -c "import sys, json; print json.load(sys.stdin)['name']")
		sha=$( echo $API_RESPONSE | python -c "import sys, json; print json.load(sys.stdin)['commit']['sha']")
		message=$( echo $API_RESPONSE | python -c "import sys, json; print json.load(sys.stdin)['commit']['commit']['message']")
		
		type_commit="${message%:*}"
		length_type_commit=${#type_commit}

		if [ $push = false ]; then 
			sha_old=$sha			
		fi

		if [ $sha != $sha_old ] && [ $length_type_commit -lt 7 ]; then
			if [ $type_commit = "API" ]; then 
				command bash ./api/restart.sh
			fi
			
			if [ $type_commit = "CLIENT" ]; then 
				command bash ./client/restart.sh
			fi

			if [ $type_commit = "DATA" ]; then 
				command bash ./data/restart.sh
			fi

			if [ $type_commit = "GLOBAL" ]; then 
				command bash ./api/restart.sh
				command bash ./client/restart.sh
				command bash ./data/restart.sh
			fi
			sha_old=$sha
		fi

	push=true
	sleep 10
	apigithub
}

apigithub