const prompt = require("prompt-sync")();

/******
 *
 * Adjacency matrix
 *  n--> number of nodes
 *  m--> number of edges
 * */

let GraphRepresentationUsingAdjancencyMatrix = () => {
  let n, m;
  n = Number(prompt());
  m = Number(prompt());
  let adj = new Array(n + 1);
  for (let i = 0; i < n + 1; i++) {
    adj[i] = new Array(n + 1).fill(0);
  }
  // for adjancency list take the edges as inputs u and v

  for (let i = 0; i < m; i++) {
    let inp = prompt().split("");
    let [u, v] = [Number(inp[0]), Number(inp[2])];
    adj[u][v] = 1;
    adj[v][u] = 1;
  }
  console.log(adj);
};
// GraphRepresentationUsingAdjancencyMatrix();

let GraphRepresentationUsingAdjancencyList=()=>{
    let n,m;
    n=Number(prompt());
    m=Number(prompt());
    let adj=new Array(n+1);
    for(let i=0;i<=n;i++){
        adj[i]=[]
    }
    for(let i=0;i<m;i++){
        let inp = prompt().split("");
        let [u, v] = [Number(inp[0]), Number(inp[2])];
        adj[u].push(v);
        adj[v].push(u);
    }
    console.log(adj)
}

// GraphRepresentationUsingAdjancencyList()