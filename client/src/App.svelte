<script>
    import {onMount} from "svelte";
    import ImageInput from "./assets/components/imageInput/ImageInput.svelte";
    import {api} from "./config/axios.js";

    let test = "";

    onMount(async () => {
        const response = await api.get('/test');
        test = response.data.data;
    })
</script>
<h1>HelloWorld {test}</h1>
<ImageInput/>
