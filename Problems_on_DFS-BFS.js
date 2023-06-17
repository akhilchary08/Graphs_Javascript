// https://leetcode.com/problems/number-of-provinces/

var findCircleNum = function(grid) {

    let dfs=(node,vis,adj)=>{
        vis[node]=true;
        for(let it of adj[node]){
            if(vis[it]===false){
                dfs(it,vis,adj)
            }
        }
    }
    
    let n=grid.length;
    let adj=new Array(n);
    let vis=new Array(n).fill(false);
    for(let i=0;i<n;i++) adj[i]=[]
    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            if(grid[i][j]===1 && i!==j){
                adj[i].push(j);
            }
        }
    }
    
    let cnt=0;
    for(let i=0;i<n;i++){
        if(vis[i]===false){
            cnt++;
            dfs(i,vis,adj);
        }
    }
    return cnt;
};
let grid=[[1,0,0],[0,1,0],[0,0,1]];
// console.log(findCircleNum(grid))


// https://leetcode.com/problems/rotting-oranges/description/
var orangesRotting = function(grid) {
    let n=grid.length,m=grid[0].length;
    let queue=[];
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(grid[i][j]===2){
                queue.push([i,j]);
            }
        }
    }
    let cnt=0;
    while(queue.length>0){
        let sz=queue.length;
        for(let k=0;k<sz;k++){
            let [i,j]=queue.shift();
            if(i+1<n && grid[i+1][j]===1){
                grid[i+1][j]=2;
                queue.push([i+1,j]);
            }
            if(j+1<m && grid[i][j+1]===1){
                grid[i][j+1]=2;
                queue.push([i,j+1]);
            }
            if(i-1>=0 && grid[i-1][j]===1){
                grid[i-1][j]=2;
                queue.push([i-1,j]);
            }
            if(j-1>=0 && grid[i][j-1]===1){
                grid[i][j-1]=2;
                queue.push([i,j-1]);
            }
        }
        if(queue.length>0) cnt++;
    }
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(grid[i][j]===1) return -1;
        }
    }
    return cnt;
};


// https://leetcode.com/problems/flood-fill/description/
var floodFill = function(image, sr, sc, c) {
    // storing the coloring of the initial pixel
    let x=image[sr][sc];

    // changing the color of the pixels that match the initial pixel
    var dfs=(image,i,j,c,x)=>{
        if(i<0 || j<0 || i>=image.length || j>=image[0].length || 
        image[i][j]!==x || image[i][j]===c){
            return ;
        }
        image[i][j]=c;
        dfs(image,i+1,j,c,x);
        dfs(image,i,j+1,c,x);
        dfs(image,i-1,j,c,x);
        dfs(image,i,j-1,c,x);
    }
    
    dfs(image,sr,sc,c,x);
    return image;
};

// cycle detection in undirected graph using dfs
class Solution {
    // Function to detect cycle in an undirected graph.
    dfs(node,par,adj,vis){
        
        vis[node]=true;
        for(let it of adj[node]){
            if(vis[it]===false){
                if(this.dfs(it,node,adj,vis)===true){
                    return true;
                }
            }
            else if(it!=par){
                return true
            }
        }
        return false;
    }
    isCycle(v, adj) {
        // code here
        let vis=new Array(v).fill(false);
        for(let i=0;i<v;i++){
            if(vis[i]===false){
                if(this.dfs(i,-1,adj,vis)){
                    return true;
                }
            }
        }
        return false;
    }
}


/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
// https://leetcode.com/problems/01-matrix/description/
// the below is solved using multisource bfs solution
var _01Matrix = function(mat) {
    let n=mat.length,m=mat[0].length;
    let queue=[];
    let dp=[];
    for(let i=0;i<n;i++){
        let x=[]
        for(let j=0;j<m;j++){
            if(mat[i][j]===0){
                queue.push([i,j]);
                x.push(0)
            }else{
                x.push(-1)
            }
        }
        dp.push(x);
    }
    while(queue.length>0){
        let sz=queue.length;
        for(let i=0;i<sz;i++){
            let [x,y]=queue.shift();
            if(x+1<n && dp[x+1][y]===-1){
                dp[x+1][y]=dp[x][y]+1;
                queue.push([x+1,y])
            }
            if(y+1<m && dp[x][y+1]===-1){
                dp[x][y+1]=dp[x][y]+1;
                queue.push([x,y+1]);
            }
            if(x-1>=0 && dp[x-1][y]===-1){
                dp[x-1][y]=dp[x][y]+1;
                queue.push([x-1,y]);
            }
            if(y-1>=0 && dp[x][y-1]===-1){
                dp[x][y-1]=dp[x][y]+1;
                queue.push([x,y-1]);
            }
        }
    }
    return dp;
};


// https://leetcode.com/problems/surrounded-regions/description/

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */


var surroundedRegions = function(board) {

    let dfs=(i,j,board)=>{
        if(i<0 || j<0 || i>=board.length || j>=board[0].length){
            return ;
        }
        if(board[i][j]==='#' || board[i][j]==='X'){
            return ;
        }
        if(board[i][j]==='O'){
            board[i][j]='#';
        }
        dfs(i+1,j,board);
        dfs(i,j+1,board);
        dfs(i-1,j,board);
        dfs(i,j-1,board);
    }

    let n=board.length;
    let m=board[0].length;
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(i===0 || j===0 || i===n-1 || j===m-1){
                dfs(i,j,board)
            }
        }
    }
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(board[i][j]==='#'){
                board[i][j]='O';
            }else if(board[i][j]==='O'){
                board[i][j]='X';
            }
        }
    }
};


// https://leetcode.com/problems/number-of-enclaves/



var numEnclaves = function(grid) {

    let dfs=(i,j,grid)=>{
        if(i<0 || j<0 || i>=grid.length || j>=grid[0].length){
            return ;
        }
        if(grid[i][j]===0){
            return ;
        }
        grid[i][j]=0;
        dfs(i+1,j,grid)
        dfs(i,j+1,grid)
        dfs(i-1,j,grid)
        dfs(i,j-1,grid)
    
    }
    
    let n=grid.length; 
    let m=grid[0].length;
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(i===0 || j===0 || i===n-1 || j===m-1){
                dfs(i,j,grid);
            }
        }
    }
    let cnt=0;
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(grid[i][j]===1){
                cnt++;
            }
        }
    }
    return cnt;
};