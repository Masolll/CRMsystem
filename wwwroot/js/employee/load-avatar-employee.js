const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const previewImage = document.querySelector('.avatar img');
const avatarImage = document.querySelector('.account img');
const imageUploadInput = document.getElementById('avatar-upload');

const getBase64Image = (img) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const dataURL = canvas.toDataURL("image/png");
    return dataURL;
}

const getEmployeeLoginFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('employeeLogin');
}

window.addEventListener('load', () => {
    const employeeLogin = getEmployeeLoginFromUrl();
    const savedAvatar = localStorage.getItem(`avatarImage-${employeeLogin}`);
    if (savedAvatar) {
        previewImage.src = savedAvatar;
        avatarImage.src = savedAvatar;
    }
});

document.getElementById('avatar-image').addEventListener('click', () => {
    document.getElementById('avatar-upload').click();
});

imageUploadInput.addEventListener('change', () => {
    if (imageUploadInput.files.length > 0) {
        const file = imageUploadInput.files[0];
        const fileName = file.name.toLowerCase();
        const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
        if (matches) {
            const imgUrl = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                const base64Image = getBase64Image(img);

                const employeeLogin = getEmployeeLoginFromUrl();

                // Обновляем картинку на странице
                previewImage.src = base64Image;
                avatarImage.src = base64Image;

                localStorage.setItem(`avatarImage-${employeeLogin}`, base64Image);
            };
            img.src = imgUrl;
        }
    }
});
