

/***
 * 
 * Breadth First Traversal for an undirected graph
 * 1. adj - Adjacency matrix
 * 2. n - number of nodes
 * 
 */

const BreadthFirstTraversal=(adj,n)=>{
    // a visited array
    let vis=Array(n).fill(false);

    // stores all the traversed elements in bfs order.
    let bfs=[];

    // for disconnected components
    for(let i=0;i<n;i++){
        if(vis[i]===false){
            let queue=[];
            vis[i]=true;
            queue.push(i);
            while(queue.length>0){
                let node=queue.shift();
                bfs.push(node);
                for(let it of adj[node]){
                    if(vis[it]===false){
                        vis[it]=true;
                        queue.push(it);
                    }
                }
            }

        }
    }
    return bfs;
}

const dfs=(node,adj,vis,storeDfs)=>{
    vis[node]=true;
    storeDfs.push(node);
    for(let it of adj[node]){
        if(vis[it]===true){
            dfs(it,adj,vis,storeDfs);
        }
    }
}

const DepthFirstTraversal=(adj,n)=>{
    let vis=Array(n).fill(false);
    let storeDfs=[];
    for(let i=0;i<n;i++){
        if(vis[i]===false){
            dfs(i,adj,vis,storeDfs);
        }
    }
    console.log(storeDfs)
}


let adj=[ [ 1,2,3 ], [], [ 4 ], [], [] ];
console.log(DepthFirstTraversal(adj,5));