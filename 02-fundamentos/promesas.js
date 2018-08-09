let empleados = [{
    id: 1,
    nombre: 'Juan'
}, {
    id: 2,
    nombre: 'Fiorella'
}, {
    id: 3,
    nombre: 'Daniela'
}];

let salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 2000
}];

let getEmpleado = (id) => {

    return new Promise((resolve, reject) => {

        let empleadoDB = empleados.find(empleado => empleado.id === id);

        if (!empleadoDB) {
            reject(`No existe un empleado con el ID ${ id }`);
        } else {
            resolve(empleadoDB);
        }
    });
}

let getSalario = (empleado) => {

    return new Promise((resolve, reject) => {

        let salarioDB = salarios.find(salario => empleado.id === salario.id);
        if (!salarioDB) {
            reject(`No se encontro un salario para el empleado ${ empleado.nombre }`);
        } else {
            resolve({
                nombre: empleado.nombre,
                salario: salarioDB.salario
            });
        }
    });
}

getEmpleado(3).then(empleado => {

    getSalario(empleado).then(resp => {
        console.log(`El salario de ${ resp.nombre } es de ${ resp.salario }`);
    }, (err) => {
        console.log(err);
    });
}, (err) => {
    console.log(err);
});