const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const previewImage = document.querySelector('.avatar img');
const avatarImage = document.querySelector('.account img');
const imageUploadInput = document.getElementById('avatar-upload');

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
            previewImage.src = imgUrl;
            avatarImage.src = imgUrl;
        }
    }
});
