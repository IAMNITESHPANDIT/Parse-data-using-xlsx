import swal from 'sweetalert';

export function ToastOnSuccess(message) {
    return swal("Success!", message, "success");
}

export function ToastOnFailure(message) {
    console.log("Error!", message)
    return swal("Oops!", message, "error");
}
