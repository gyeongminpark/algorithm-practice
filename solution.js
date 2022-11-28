const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);
const graph = Array(N)
  .fill(0)
  .map(() => []);
for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

let isLine = false;
let visited;

for (let i = 0; i < N; i++) {
  visited = Array(N).fill(false);
  dfs(i, 1);
  if (isLine) {
    break;
  }
}

console.log(isLine ? 1 : 0);

function dfs(start, cnt) {
  if (cnt === 5) {
    isLine = true;
    return;
  }

  visited[start] = true;
  for (const x of graph[start]) {
    if (visited[x]) continue;
    dfs(x, cnt + 1);

    if (isLine) {
      return;
    }
  }
  visited[start] = false; // *
}
