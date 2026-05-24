# DSA 200 Problem List — Fresher SDE Placement (ML Major)
**Target**: Product + Service + Startup companies | Indian college placements  
**Stack**: Python | Timeline: ~70 days structured

---

## Schedule Overview

| Phase | Days | Problems/Day | Total |
|---|---|---|---|
| Phase 1 — Foundation | Day 1–20 | 2/day | 40 |
| Phase 2 — Core Patterns | Day 21–50 | 3/day | 90 |
| Phase 3 — Advanced + Mixed | Day 51–70 | 3–4/day | 70 |

---

## PHASE 1 — Foundation (Day 1–20, 2/day)
*Focus: Arrays, Strings, Hashing — patterns you're already re-activating*

| Day | # | Problem | Leetcode | Difficulty | Key Pattern | Appeared In |
|---|---|---|---|---|---|---|
| 1 | 1 | Two Sum | LC 1 | Easy | HashMap | Google, Amazon, almost everywhere |
| 1 | 2 | Pascal's Triangle | LC 118 | Easy | 2D Array Build | TCS, Infosys |
| 2 | 3 | Best Time to Buy and Sell Stock | LC 121 | Easy | Sliding min | Amazon, Flipkart |
| 2 | 4 | Contains Duplicate | LC 217 | Easy | HashSet | Microsoft, Adobe |
| 3 | 5 | Maximum Subarray (Kadane's) | LC 53 | Medium | Kadane's | Amazon, Google |
| 3 | 6 | Merge Sorted Array | LC 88 | Easy | Two Pointer | Microsoft, Infosys |
| 4 | 7 | Move Zeroes | LC 283 | Easy | Two Pointer | Facebook, Adobe |
| 4 | 8 | Find the Duplicate Number | LC 287 | Medium | Floyd's / HashSet | Amazon, Paytm |
| 5 | 9 | Rotate Array | LC 189 | Medium | Reversal Trick | Microsoft, Zoho |
| 5 | 10 | Plus One | LC 66 | Easy | Array Carry | Google, Wipro |
| 6 | 11 | Single Number | LC 136 | Easy | XOR Trick | Amazon, TCS |
| 6 | 12 | Majority Element | LC 169 | Easy | Boyer-Moore | Amazon, Razorpay |
| 7 | 13 | Next Permutation | LC 31 | Medium | Two Pointer + Reverse | Google, Directi |
| 7 | 14 | Merge Intervals | LC 56 | Medium | Sorting + Greedy | Google, Swiggy |
| 8 | 15 | Find Missing and Repeated | LC 2965 | Medium | Frequency Map | Wipro, TCS |
| 8 | 16 | Search in Rotated Sorted Array | LC 33 | Medium | Binary Search | Amazon, Microsoft |
| 9 | 17 | Product of Array Except Self | LC 238 | Medium | Prefix/Suffix | Amazon, Ola |
| 9 | 18 | Maximum Product Subarray | LC 152 | Medium | Kadane's variant | Paytm, Flipkart |
| 10 | 19 | 3Sum | LC 15 | Medium | Two Pointer | Amazon, Adobe |
| 10 | 20 | Container With Most Water | LC 11 | Medium | Two Pointer | Google, Amazon |
| 11 | 21 | Valid Anagram | LC 242 | Easy | HashMap | Microsoft, Zoho |
| 11 | 22 | Group Anagrams | LC 49 | Medium | HashMap | Amazon, Razorpay |
| 12 | 23 | Longest Common Prefix | LC 14 | Easy | String | TCS, Infosys |
| 12 | 24 | Valid Palindrome | LC 125 | Easy | Two Pointer | Microsoft, Wipro |
| 13 | 25 | Longest Substring Without Repeating Characters | LC 3 | Medium | Sliding Window | Amazon, Google |
| 13 | 26 | Find All Anagrams in a String | LC 438 | Medium | Sliding Window | Directi, Zomato |
| 14 | 27 | Minimum Window Substring | LC 76 | Hard | Sliding Window | Google, Flipkart |
| 14 | 28 | String to Integer (atoi) | LC 8 | Medium | String Parse | Amazon, Microsoft |
| 15 | 29 | Count and Say | LC 38 | Medium | String Build | TCS, Adobe |
| 15 | 30 | Roman to Integer | LC 13 | Easy | HashMap | Amazon, Wipro |
| 16 | 31 | Longest Palindromic Substring | LC 5 | Medium | Expand Around Center | Amazon, Swiggy |
| 16 | 32 | Reverse Words in a String | LC 151 | Medium | String | Microsoft, Zoho |
| 17 | 33 | Rotate Image | LC 48 | Medium | Transpose + Reverse | Amazon, Adobe |
| 17 | 34 | Spiral Matrix | LC 54 | Medium | Simulation | Microsoft, Google |
| 18 | 35 | Set Matrix Zeroes | LC 73 | Medium | In-place Matrix | Amazon, Directi |
| 18 | 36 | Search a 2D Matrix | LC 74 | Medium | Binary Search | Microsoft, Oracle |
| 19 | 37 | Pow(x, n) | LC 50 | Medium | Fast Exponentiation | Google, Flipkart |
| 19 | 38 | Majority Element II | LC 229 | Medium | Boyer-Moore | Amazon, Paytm |
| 20 | 39 | Subarray Sum Equals K | LC 560 | Medium | Prefix Sum + HashMap | Amazon, Razorpay |
| 20 | 40 | Sort Colors | LC 75 | Medium | Dutch National Flag | Microsoft, Adobe |

---

## PHASE 2 — Core Patterns (Day 21–50, 3/day)
*Focus: Stacks, Queues, Linked Lists, Binary Search, Trees*

### Stacks & Queues (Day 21–27)

| Day | # | Problem | Leetcode | Difficulty | Key Pattern | Appeared In |
|---|---|---|---|---|---|---|
| 21 | 41 | Valid Parentheses | LC 20 | Easy | Stack | Amazon, Microsoft |
| 21 | 42 | Min Stack | LC 155 | Medium | Stack Design | Amazon, Paytm |
| 21 | 43 | Daily Temperatures | LC 739 | Medium | Monotonic Stack | Google, Swiggy |
| 22 | 44 | Next Greater Element I | LC 496 | Easy | Monotonic Stack | TCS, Zoho |
| 22 | 45 | Next Greater Element II | LC 503 | Medium | Circular Monotonic Stack | Directi |
| 22 | 46 | Largest Rectangle in Histogram | LC 84 | Hard | Monotonic Stack | Amazon, Google |
| 23 | 47 | Implement Queue using Stacks | LC 232 | Easy | Stack Design | Microsoft, Wipro |
| 23 | 48 | Implement Stack using Queues | LC 225 | Easy | Queue Design | Infosys |
| 23 | 49 | Sliding Window Maximum | LC 239 | Hard | Deque | Amazon, Flipkart |
| 24 | 50 | Trapping Rain Water | LC 42 | Hard | Two Pointer / Stack | Google, Amazon |
| 24 | 51 | Car Fleet | LC 853 | Medium | Monotonic Stack | Google |
| 24 | 52 | Decode String | LC 394 | Medium | Stack | Amazon, Adobe |
| 25 | 53 | Evaluate Reverse Polish Notation | LC 150 | Medium | Stack | Directi, Razorpay |
| 25 | 54 | Asteroid Collision | LC 735 | Medium | Stack | Google, Zomato |
| 25 | 55 | Remove K Digits | LC 402 | Medium | Greedy + Stack | Amazon |
| 26 | 56 | Number of Visible People in a Queue | LC 1944 | Hard | Monotonic Stack | Google |
| 26 | 57 | Task Scheduler | LC 621 | Medium | Greedy + Queue | Amazon, Microsoft |
| 26 | 58 | Design Circular Queue | LC 622 | Medium | Queue Design | Zoho, TCS |
| 27 | 59 | LRU Cache | LC 146 | Medium | HashMap + DLL | Amazon, Flipkart |
| 27 | 60 | Maximum Frequency Stack | LC 895 | Hard | Stack Design | Google |

### Linked Lists (Day 28–33)

| Day | # | Problem | Leetcode | Difficulty | Key Pattern | Appeared In |
|---|---|---|---|---|---|---|
| 28 | 61 | Reverse Linked List | LC 206 | Easy | Iteration/Recursion | Amazon, Microsoft |
| 28 | 62 | Merge Two Sorted Lists | LC 21 | Easy | Two Pointer | Amazon, Adobe |
| 28 | 63 | Linked List Cycle | LC 141 | Easy | Floyd's | Amazon, Paytm |
| 29 | 64 | Linked List Cycle II | LC 142 | Medium | Floyd's | Amazon, Directi |
| 29 | 65 | Find Middle of Linked List | LC 876 | Easy | Slow/Fast Pointer | TCS, Zoho |
| 29 | 66 | Remove Nth Node From End | LC 19 | Medium | Two Pointer | Amazon, Microsoft |
| 30 | 67 | Reorder List | LC 143 | Medium | Slow/Fast + Reverse | Google, Swiggy |
| 30 | 68 | Add Two Numbers | LC 2 | Medium | Carry Logic | Amazon, Adobe |
| 30 | 69 | Palindrome Linked List | LC 234 | Easy | Slow/Fast + Reverse | Microsoft, Wipro |
| 31 | 70 | Copy List with Random Pointer | LC 138 | Medium | HashMap | Amazon, Razorpay |
| 31 | 71 | Flatten a Multilevel Doubly Linked List | LC 430 | Medium | DFS/Stack | Google |
| 31 | 72 | Rotate List | LC 61 | Medium | Two Pointer | Flipkart, TCS |
| 32 | 73 | Sort List | LC 148 | Medium | Merge Sort on LL | Amazon, Adobe |
| 32 | 74 | Intersection of Two Linked Lists | LC 160 | Easy | Two Pointer | Amazon, Microsoft |
| 32 | 75 | Swap Nodes in Pairs | LC 24 | Medium | Pointer Manipulation | Directi, Zomato |
| 33 | 76 | Reverse Nodes in k-Group | LC 25 | Hard | Pointer Manipulation | Google, Amazon |
| 33 | 77 | Remove Duplicates from Sorted List II | LC 82 | Medium | Two Pointer | Microsoft |
| 33 | 78 | Partition List | LC 86 | Medium | Two Pointer | Amazon |

### Binary Search (Day 34–38)

| Day | # | Problem | Leetcode | Difficulty | Key Pattern | Appeared In |
|---|---|---|---|---|---|---|
| 34 | 79 | Binary Search | LC 704 | Easy | Classic BS | Everywhere |
| 34 | 80 | Find First and Last Position | LC 34 | Medium | BS on answer | Amazon, Google |
| 34 | 81 | Search Insert Position | LC 35 | Easy | BS | Microsoft, Wipro |
| 35 | 82 | Find Minimum in Rotated Sorted Array | LC 153 | Medium | BS | Amazon, Flipkart |
| 35 | 83 | Peak Index in Mountain Array | LC 852 | Medium | BS | Google |
| 35 | 84 | Koko Eating Bananas | LC 875 | Medium | BS on answer | Amazon, Google |
| 36 | 85 | Capacity to Ship Packages | LC 1011 | Medium | BS on answer | Amazon |
| 36 | 86 | Median of Two Sorted Arrays | LC 4 | Hard | BS | Google, Directi |
| 36 | 87 | Find K Closest Elements | LC 658 | Medium | BS + Two Pointer | Amazon |
| 37 | 88 | Aggressive Cows (GFG) | GFG | Medium | BS on answer | Razorpay, Swiggy |
| 37 | 89 | Allocate Minimum Pages (GFG) | GFG | Hard | BS on answer | Flipkart, Amazon |
| 37 | 90 | Square Root (floor) | LC 69 | Easy | BS | TCS, Infosys |
| 38 | 91 | Find the Smallest Divisor | LC 1283 | Medium | BS on answer | Google |
| 38 | 92 | Single Element in Sorted Array | LC 540 | Medium | BS | Amazon, Microsoft |
| 38 | 93 | Count Negative Numbers in Matrix | LC 1351 | Easy | BS | Adobe |

### Trees (Day 39–50)

| Day | # | Problem | Leetcode | Difficulty | Key Pattern | Appeared In |
|---|---|---|---|---|---|---|
| 39 | 94 | Inorder Traversal | LC 94 | Easy | DFS | Everywhere |
| 39 | 95 | Preorder Traversal | LC 144 | Easy | DFS | Everywhere |
| 39 | 96 | Postorder Traversal | LC 145 | Easy | DFS | Everywhere |
| 40 | 97 | Level Order Traversal | LC 102 | Medium | BFS | Amazon, Microsoft |
| 40 | 98 | Maximum Depth of Binary Tree | LC 104 | Easy | DFS | Amazon, Adobe |
| 40 | 99 | Symmetric Tree | LC 101 | Easy | DFS | Microsoft, TCS |
| 41 | 100 | Diameter of Binary Tree | LC 543 | Easy | DFS | Amazon, Paytm |
| 41 | 101 | Path Sum | LC 112 | Easy | DFS | Wipro, Zoho |
| 41 | 102 | Balanced Binary Tree | LC 110 | Easy | DFS | Microsoft |
| 42 | 103 | Lowest Common Ancestor | LC 236 | Medium | DFS | Amazon, Google |
| 42 | 104 | Binary Tree Right Side View | LC 199 | Medium | BFS | Amazon, Flipkart |
| 42 | 105 | Zigzag Level Order | LC 103 | Medium | BFS | Amazon, Directi |
| 43 | 106 | Construct Tree from Pre+Inorder | LC 105 | Medium | Recursion | Amazon, Google |
| 43 | 107 | Flatten Binary Tree to Linked List | LC 114 | Medium | DFS | Amazon, Adobe |
| 43 | 108 | Count Good Nodes | LC 1448 | Medium | DFS | Google |
| 44 | 109 | Validate BST | LC 98 | Medium | DFS + Range | Amazon, Microsoft |
| 44 | 110 | Kth Smallest in BST | LC 230 | Medium | Inorder | Amazon, Paytm |
| 44 | 111 | Insert into BST | LC 701 | Medium | BST Property | Adobe |
| 45 | 112 | Delete Node in BST | LC 450 | Medium | BST Property | Microsoft |
| 45 | 113 | Recover BST | LC 99 | Medium | Morris/Inorder | Google |
| 45 | 114 | BST Iterator | LC 173 | Medium | Stack + Inorder | Amazon |
| 46 | 115 | Serialize and Deserialize Binary Tree | LC 297 | Hard | BFS/DFS | Amazon, Google |
| 46 | 116 | Binary Tree Maximum Path Sum | LC 124 | Hard | DFS | Google, Razorpay |
| 46 | 117 | Vertical Order Traversal | LC 987 | Hard | BFS + Sort | Amazon, Flipkart |
| 47 | 118 | Top View of Binary Tree (GFG) | GFG | Medium | BFS + HashMap | Zoho, TCS |
| 47 | 119 | Bottom View of Binary Tree (GFG) | GFG | Medium | BFS + HashMap | Amazon, Wipro |
| 47 | 120 | Boundary Traversal (GFG) | GFG | Medium | DFS | Directi |
| 48 | 121 | Morris Inorder Traversal | LC 501 | Medium | Morris | Google |
| 48 | 122 | All Nodes Distance K | LC 863 | Medium | BFS | Amazon |
| 48 | 123 | Time to Burn Tree (GFG) | GFG | Hard | BFS | Amazon, Swiggy |
| 49 | 124 | Count Nodes in Complete BT | LC 222 | Medium | BS + Tree | Microsoft |
| 49 | 125 | Sum of Nodes at Max Depth | LC 1161 | Medium | BFS | Adobe |
| 49 | 126 | Maximum Width of Binary Tree | LC 662 | Medium | BFS | Amazon |
| 50 | 127 | Populating Next Right Pointers | LC 116 | Medium | BFS | Microsoft, Google |
| 50 | 128 | Check Completeness of BT | LC 958 | Medium | BFS | Amazon |
| 50 | 129 | Invert Binary Tree | LC 226 | Easy | DFS | Everywhere |

---

## PHASE 3 — Advanced + Mixed (Day 51–70, 3–4/day)
*Focus: Graphs, DP, Greedy, Heaps — interview favourites*

### Graphs (Day 51–58)

| Day | # | Problem | Leetcode | Difficulty | Key Pattern | Appeared In |
|---|---|---|---|---|---|---|
| 51 | 130 | Number of Islands | LC 200 | Medium | BFS/DFS | Amazon, Microsoft |
| 51 | 131 | Clone Graph | LC 133 | Medium | BFS + HashMap | Google, Facebook |
| 51 | 132 | Flood Fill | LC 733 | Easy | DFS | Adobe, TCS |
| 52 | 133 | Course Schedule | LC 207 | Medium | Topo Sort | Amazon, Google |
| 52 | 134 | Course Schedule II | LC 210 | Medium | Topo Sort | Amazon |
| 52 | 135 | Number of Connected Components | LC 323 | Medium | Union Find | Microsoft |
| 53 | 136 | Pacific Atlantic Water Flow | LC 417 | Medium | Multi-source BFS | Google |
| 53 | 137 | Rotting Oranges | LC 994 | Medium | Multi-source BFS | Amazon, Swiggy |
| 53 | 138 | Surrounded Regions | LC 130 | Medium | BFS/DFS | Microsoft |
| 54 | 139 | Word Ladder | LC 127 | Hard | BFS | Amazon, Google |
| 54 | 140 | Bipartite Graph Check | LC 785 | Medium | BFS/DFS | Directi |
| 54 | 141 | Detect Cycle in Directed Graph (GFG) | GFG | Medium | DFS + Color | Amazon, Flipkart |
| 55 | 142 | Dijkstra's Algorithm (GFG) | GFG | Medium | Priority Queue | Google, Razorpay |
| 55 | 143 | Cheapest Flights Within K Stops | LC 787 | Medium | Bellman-Ford | Amazon |
| 55 | 144 | Network Delay Time | LC 743 | Medium | Dijkstra | Google |
| 56 | 145 | Minimum Spanning Tree (GFG) | GFG | Medium | Kruskal/Prim | Directi, Flipkart |
| 56 | 146 | Number of Provinces | LC 547 | Medium | Union Find / DFS | Microsoft, Wipro |
| 56 | 147 | Accounts Merge | LC 721 | Medium | Union Find | Google, Amazon |
| 57 | 148 | Find Eventual Safe States | LC 802 | Medium | Topo Sort | Google |
| 57 | 149 | Alien Dictionary (GFG) | GFG | Hard | Topo Sort | Amazon, Google |
| 57 | 150 | Critical Connections | LC 1192 | Hard | Tarjan's | Google |

### Dynamic Programming (Day 58–66)

| Day | # | Problem | Leetcode | Difficulty | Key Pattern | Appeared In |
|---|---|---|---|---|---|---|
| 58 | 151 | Climbing Stairs | LC 70 | Easy | 1D DP | Everywhere |
| 58 | 152 | Fibonacci Number | LC 509 | Easy | 1D DP | TCS, Infosys |
| 58 | 153 | House Robber | LC 198 | Medium | 1D DP | Amazon, Microsoft |
| 59 | 154 | House Robber II | LC 213 | Medium | 1D DP Circular | Amazon |
| 59 | 155 | Jump Game | LC 55 | Medium | Greedy/DP | Amazon, Flipkart |
| 59 | 156 | Jump Game II | LC 45 | Medium | Greedy | Google, Paytm |
| 60 | 157 | Coin Change | LC 322 | Medium | Unbounded Knapsack | Amazon, Google |
| 60 | 158 | Coin Change II | LC 518 | Medium | Unbounded Knapsack | Amazon |
| 60 | 159 | Word Break | LC 139 | Medium | DP + HashSet | Amazon, Microsoft |
| 61 | 160 | Longest Common Subsequence | LC 1143 | Medium | 2D DP | Google, Amazon |
| 61 | 161 | Edit Distance | LC 72 | Hard | 2D DP | Google, Directi |
| 61 | 162 | Longest Increasing Subsequence | LC 300 | Medium | DP / BSearch | Amazon, Flipkart |
| 62 | 163 | 0/1 Knapsack (GFG) | GFG | Medium | Classic DP | Everywhere |
| 62 | 164 | Subset Sum (GFG) | GFG | Medium | DP | TCS, Wipro |
| 62 | 165 | Partition Equal Subset Sum | LC 416 | Medium | Knapsack | Amazon, Razorpay |
| 63 | 166 | Unique Paths | LC 62 | Medium | 2D DP | Google, Microsoft |
| 63 | 167 | Unique Paths II | LC 63 | Medium | 2D DP | Amazon |
| 63 | 168 | Minimum Path Sum | LC 64 | Medium | 2D DP | Amazon, Adobe |
| 64 | 169 | Burst Balloons | LC 312 | Hard | Interval DP | Google |
| 64 | 170 | Matrix Chain Multiplication (GFG) | GFG | Hard | Interval DP | Directi |
| 64 | 171 | Palindromic Substrings | LC 647 | Medium | Expand/DP | Amazon |
| 65 | 172 | Longest Palindromic Subsequence | LC 516 | Medium | 2D DP | Google, Flipkart |
| 65 | 173 | Regular Expression Matching | LC 10 | Hard | 2D DP | Google |
| 65 | 174 | Distinct Subsequences | LC 115 | Hard | 2D DP | Google, Amazon |
| 66 | 175 | Stock Buy Sell with Cooldown | LC 309 | Medium | State Machine DP | Amazon |
| 66 | 176 | Best Time to Buy and Sell Stock III | LC 123 | Hard | State Machine DP | Google |
| 66 | 177 | Best Time to Buy and Sell Stock IV | LC 188 | Hard | State Machine DP | Google |

### Heaps + Greedy + Mixed (Day 67–70)

| Day | # | Problem | Leetcode | Difficulty | Key Pattern | Appeared In |
|---|---|---|---|---|---|---|
| 67 | 178 | Kth Largest Element | LC 215 | Medium | Heap | Amazon, Google |
| 67 | 179 | Top K Frequent Elements | LC 347 | Medium | Heap + HashMap | Amazon, Microsoft |
| 67 | 180 | K Closest Points to Origin | LC 973 | Medium | Heap | Amazon, Google |
| 68 | 181 | Merge K Sorted Lists | LC 23 | Hard | Heap | Amazon, Google |
| 68 | 182 | Find Median from Data Stream | LC 295 | Hard | Two Heaps | Amazon, Google |
| 68 | 183 | Meeting Rooms II | LC 253 | Medium | Heap + Sort | Google, Razorpay |
| 69 | 184 | Jump Game (Greedy) | LC 55 | Medium | Greedy | Amazon |
| 69 | 185 | Gas Station | LC 134 | Medium | Greedy | Amazon, Directi |
| 69 | 186 | Hand of Straights | LC 846 | Medium | Greedy + HashMap | Google |
| 70 | 187 | Merge Triplets to Form Target | LC 1899 | Medium | Greedy | Google |
| 70 | 188 | Partition Labels | LC 763 | Medium | Greedy | Amazon, Swiggy |
| 70 | 189 | Valid Parenthesis String | LC 678 | Medium | Greedy | Google |
| 70 | 190 | Non-overlapping Intervals | LC 435 | Medium | Greedy + Sort | Google, Amazon |

---

## BONUS — Company Specific (Solve anytime in Phase 3)

| # | Problem | Leetcode | Target Company |
|---|---|---|---|
| 191 | Two Sum II | LC 167 | Microsoft, TCS |
| 192 | Four Sum | LC 18 | Amazon, Adobe |
| 193 | Subsets | LC 78 | Amazon, Google |
| 194 | Permutations | LC 46 | Amazon, Directi |
| 195 | Combination Sum | LC 39 | Amazon, Google |
| 196 | N-Queens | LC 51 | Google, Directi |
| 197 | Sudoku Solver | LC 37 | Google, Adobe |
| 198 | Word Search | LC 79 | Amazon, Microsoft |
| 199 | Rat in a Maze (GFG) | GFG | TCS, Wipro, Zoho |
| 200 | Print all Subsequences (GFG) | GFG | Razorpay, Paytm |

---

## Marking System (for tracker)

After each problem, mark one:

| Tag | Meaning |
|---|---|
| ✅ Solved Clean | Got it without hints, coded correctly |
| 🔁 Logic Stuck | Understood after hint, couldn't derive pattern alone |
| 🔧 Syntax Stuck | Had logic, struggled with code flow/syntax |
| 💀 Blind | No idea even after 30 min, needed full solution |
| ⭐ Revise | Important problem, needs re-attempt in 3 days |

---

## Revision Rule
- 🔁 / 💀 problems → re-attempt after 3 days  
- ⭐ problems → re-attempt after 7 days  
- All Phase 1 problems → quick re-solve before any interview

---

*Built for: Indian fresher SDE placement | ML Major | Python | ~70 day prep*
