const showData = (data) => {
    document.append(data);
}
(async ()=>{
    const node = await Ipfs.create()
    window.node = node
    const stream = node.cat(localStorage.getItem('cid')+'/index.html')
    let data = ''
    for await (const chunk of stream) {
    data += chunk.toString()
    }
    var newHTML = document.open("text/html", "replace"); 
    newHTML.write(data); 
    newHTML.close(); 
})()
