if [ $MODE = "dev" ]; then
    echo "Ejecutando servidor en modo desarrollo"
    command yarn run dev
fi

if [ $MODE = "prod" ]; then 
    echo "Ejecutando servidor en modo produccion"
    command bash ./build.sh
fi