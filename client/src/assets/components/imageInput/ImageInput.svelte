<script>
    import {api} from "../../../api/axios.js";

    let avatar, fileInput, base64Image;

    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            avatar = e.target.result;
            base64Image = e.target.result.split(',')[1];
        };
    };

    async function handleUpload() {
        const formData = new FormData();
        formData.append('file', base64Image);

        await api.post('/test/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(({ data }) => console.log(data));
    }
</script>
<div id="app">
    <h1>Upload Image</h1>

    {#if avatar}
        <img class="avatar" src="{avatar}" alt="d" />
    {:else}
        <img
                class="avatar"
                src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
                alt=""
        />
    {/if}
    <img
            class="upload"
            src="https://static.thenounproject.com/png/625182-200.png"
            alt=""
            on:click={() => {
            fileInput.click();
        }}
    />
    <div class="chan" on:click={() => { fileInput.click(); }}>Choose Image</div>
    <input
            style="display:none"
            type="file"
            accept=".jpg, .jpeg, .png"
            on:change={(e) => onFileSelected(e)}
            bind:this={fileInput}
    />
    <button on:click={handleUpload}>upload</button>
</div>
<style>
    #app {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
    }

    .upload {
        display: flex;
        height: 50px;
        width: 50px;
        cursor: pointer;
    }
    .avatar {
        display: flex;
        height: 200px;
        width: 200px;
    }
</style>
