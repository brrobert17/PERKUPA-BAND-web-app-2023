<script>
    import {onMount} from "svelte";
    import {BASE_URL} from "./stores/globalStore.js";

    let test = "";
    onMount(async ()=> {
        const response = await fetch($BASE_URL + "/test", {
            credentials: "include"
        });
        const result = await response.json();
        test = result.data;
    })
</script>
<h1>HelloWorld {test}</h1>
