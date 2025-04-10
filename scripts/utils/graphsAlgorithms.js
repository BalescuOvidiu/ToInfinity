/**
 * 
// Havel
unsigned n;
vector<unsigned> d;
//Read
ifstream in("havel.txt");
while(in>>n){
	if(n>=d.size())
		d.resize(n+1);
	d[n]++;
	for(unsigned i=0;i<d.size();i++)
		cout<<d[i]<<' ';
	cout<<'\n';
}
cout<<'\n';
in.close();
n=d.size()-1;
//Check sum of degrees
unsigned long sum=0;
for(unsigned i=1;i<=n;i+=2){
	sum+=i*d[i];
}
if(sum%2){
	cout<<"This can't be a graph because sum is odd.\n";
	return 0;
}
for(unsigned i=0;i<d.size();i++)
	cout<<d[i]<<' ';
cout<<'\n';
//Check nodes
while(n){
	if(d[n]){
		d[n]--;
		unsigned q=n;
		for(int i=n;i>=0;i--){
			if(d[i]>=q){
				d[i]-=q;
				d[i-1]+=q;
				q=0;
				break;
			}else{
				q-=d[i];
				d[i-1]+=d[i];
				d[i]=0;
			}
		}
		if(q){
			cout<<"No, this can't be a graph.\n";
			return 0;
		}
	}else{
		n--;
	}
	for(unsigned i=0;i<d.size();i++)
		cout<<d[i]<<' ';
	cout<<'\n';
}
cout<<"Yes, this can be a graph.\n";

void breathFirstSearch(){
	Graph graph=loadGraphI("menu/problems/101.txt");
	if(!graph.n)
		return ;
	printf("   Size of graph is %u.",graph.n);
	unsigned node;
	selectNode(&node);
	while(node&&node<=graph.n){
		node--;
		//Search stacks
		short selected[graph.n];
		unsigned list[graph.n];
		unsigned i=0,size=1;
		//Initialize search
		for(i=0;i<graph.n;i++)
			selected[i]=list[i]=0;
		list[0]=node;
		//Search
		printf("\n   Track is:");
		//Selected node
		writeNodeI(graph,list[0]);
		selected[list[0]]=1;
		//On width
		while(size){
			for(i=0;i<graph.n;i++){
				if(getTie(graph,list[0],i)&&!selected[i]){
					writeNodeI(graph,i);
					list[size++]=i;
					selected[i]=1;
				}
			}
			//Clear list
			size--;
			for(i=0;i<size;i++)
				list[i]=list[i+1];
			list[size]=0;
		}
		//Read
		selectNode(&node);
	}
}
void deepFirstSearch(){
	//Read data
	Graph graph=loadGraphI("menu/problems/102.txt");
	if(!graph.n)
		return ;
	printf("   Size of graph is %u.",graph.n);
	unsigned node;
	//First read
	selectNode(&node);
	//Search and other reads
	while(node&&node<graph.n){
		//Search stacks
		short back[graph.n],find=1,getBack,selected[graph.n];
		unsigned i,size=graph.n;
		//Initialize search
		node--;
		for(i=0;i<graph.n;i++){
			back[i]=-1;
			selected[i]=0;
		}
		//Search
		printf("\n   Track is:");
		while(find){
			if(!selected[node])
				writeNodeI(graph,node);
			//Selected node
			find=0;
			getBack=1;
			selected[node]=1;
			//Select adiacent and unselected nodes
			for(i=0;i<graph.n;i++){
				if(getTie(graph,node,i)&&!selected[i]){
					//Bool variables
					find=1;
					getBack=0;
					//Value
					back[i]=node;
					node=i;
					//Break cicle
					break;
				}else if(i==graph.n-1&&i!=node){
					find=1;
					getBack=1;
				}
			}
			//Recursive back
			if(back[node]>=0&&getBack)
				node=back[node];
		}
		//Read
		selectNode(&node);
	}
}
void eulerianCicle(){
	Graph graph=loadGraphI("menu/problems/103.txt");
	if(!graph.n)
		return ;
	//Search stacks
	unsigned *list;
	short *selected;
	//Other variables
	unsigned i,tie;
	short size=1;
	//Initialize search
	list=(unsigned*)calloc(graph.m,sizeof(unsigned));
	selected=(short*)calloc(graph.m,sizeof(short));
	//Isolated nodes
	if(!graph.m){
		printf("   Nodes of graph are isolated!\n");
		return ;
	}
	//Get first nodes non-isolated
	tie=graph.tie[0].a;
	//Search
	while(0<=size&&tie<graph.m){
		//Selected node
		selected[tie]=1;
		//Select adiacent and unselected nodes
		for(i=list[size];i<graph.m;i++){
			if(isLinked(graph,tie,i)&&!selected[i]){
				tie=i;
				list[size++]=i;
				break;
			}else if(i==graph.m-1){
				size--;
				if(size<0)
					break;
				else
					selected[list[size]]=0;
			}
		}
	}
	//Print
	if(size>=0&&isLinked(graph,list[0],list[size-1])){
		printf("   A eulerian cicle is: ");
		writeNodeI(graph,graph.tie[list[0]].a);
		for(i=0;i<size;i++)
			writeNodeI(graph,graph.tie[list[i]].b);
	}else{
		printf("   This graph don't has eulerians cicle");
	}
	printf(".");
}
void hamiltonianCicle(){
	Graph graph=loadGraphI("menu/problems/104.txt");
	if(!graph.n)
		return ;
	//Search stacks
	unsigned *list;
	short *selected;
	//Other variables
	unsigned i=0,node=0;
	short size=0;
	//Initialize search
	list=(unsigned*)calloc(graph.n,sizeof(unsigned));
	selected=(short*)calloc(graph.n,sizeof(short));
	//Search
	while(0<=size&&size<graph.n){
		//Selected node
		selected[node]=1;
		list[size]=node;
		//Select adiacent and unselected nodes
		for(i=list[size];i<graph.n;i++){
			if(getTie(graph,node,i)&&!selected[i]){
				node=i;
				size++;
				break;
			}else if(i==graph.n-1){
				size--;
				if(size<0)
					break;
				else
					selected[list[size]]=0;
			}
		}
	}
	//Print
	if(size>=0&&getTie(graph,list[0],list[size-1])){
		printf("   A hamiltonian cicle is: ");
		for(i=0;i<graph.n;i++)
			writeNodeI(graph,list[i]);
	}else{
		printf("   This graph don't has hamiltonian cicle");
	}
	printf(".");
}
//Oriented graph methods
void travellerProblem(){
	Graph graph=loadGraphS("menu/problems/201.txt");
	if(!graph.n)
		return ;
	//Get cities name
	unsigned i;
	char name[graph.n][200];
	for(i=0;i<graph.n;i++)
		strcpy(name[i],graph.key[i].name);
	qsort(name,graph.n,sizeof(name[0]),compareNames);
	printf("   Cities: %s",name[0]);
	for(i=1;i<graph.n;i++){
		printf(", %s",name[i]);
	}
	printf(".\n");
	//Search stacks
	unsigned *list;
	short *selected;
	//Other variables
	unsigned node=0;
	short size=0;
	//Initialize search
	list=(unsigned*)calloc(graph.n,sizeof(unsigned));
	selected=(short*)calloc(graph.n,sizeof(short));
	//Search
	while(0<=size&&size<graph.n){
		//Selected node
		selected[node]=1;
		list[size]=node;
		//Select adiacent and unselected nodes
		for(i=list[size];i<graph.n;i++){
			if(getTie(graph,node,i)&&!selected[i]){
				node=i;
				size++;
				break;
			}else if(i==graph.n-1){
				size--;
				if(size<0)
					break;
				else
					selected[list[size]]=0;
			}
		}
	}
	//Print
	if(size>=0&&getTie(graph,list[0],list[size-1])){
		printf("   A route is: ");
		for(i=0;i<graph.n;i++)
			writeNodeS(graph,list[i]);
	}else{
		printf("   This graph don't has route");
	}
	printf(".");
}
void royFloyd(){
	//Load data from files
	Graph graph=loadGraphI("menu/problems/202.txt");
	if(!graph.n)
		return ;
	//Get matrix of graph
	unsigned **a;
	a=getMatrix(graph);
	//Roy-Floyd algorithm
	unsigned i,j,k;
	for(i=0;i<graph.n;i++){
		for(j=0;j<graph.n;j++){
			if(i!=j){
				for(k=0;k<graph.n;k++){
					if(a[i][j]>a[i][k]+a[k][j])
						a[i][j]=a[i][k]+a[k][j];
				}
			}
		}
	}
	//Print result
	for(i=0;i<graph.n;i++){
		printf("\n   ");
		for(j=0;j<graph.n;j++)
			printf("%u ",a[i][j]);
	}
}
void dijkstra(){
	Graph graph=loadGraphI("menu/problems/203.txt");
	if(!graph.n)
		return ;
	printf("   Size of graph is %u.",graph.n);
	//Begin
	unsigned begin,i,j;
	selectNode(&begin);
	//Search stacks
	short *selected;
	unsigned *d,*f;
	selected=(short*)calloc(graph.n,sizeof(short));
	d=(unsigned*)calloc(graph.n,sizeof(unsigned));
	f=(unsigned*)calloc(graph.n,sizeof(unsigned));
	//Data for search
	selected[begin]=1;
	for(i=0;i<graph.n;i++){
		//Get values
		if(getTie(graph,begin,i)){
			d[i]=getCost(graph,begin,i);
			f[i]=begin;
		}else{
			d[i]=999999;
			f[i]=-1;
		}
	}		
	//Search
	for(j=1;j<graph.n;j++){
		//Get nearest unselected node
		short near=-1;
		unsigned minDist=999999;
		for(i=0;i<graph.n;i++)
			if(!selected[i]){
				if(minDist>d[i]){
					near=i;
					minDist=d[i];
				}
			}
		selected[near]=1;
		//Get list
		for(unsigned i=0;i<graph.n;i++)
			if(getTie(graph,near,i)&&!selected[i]){
				if(d[i]>d[near]+1){
					d[i]=d[near]+1;
					f[i]=near;
				}
			}
	}
	//Get routes
	unsigned node=1;
	while(0<=node&&node<graph.n&&node!=begin){
		unsigned *route;
		unsigned size=1;
		//Clear memory
		size=0;
		//Select node
		selectNode(&node);
		//Get route
		while(f[node]!=-1){
			route=(unsigned*)realloc(route,sizeof(unsigned)*(size++));
			route[size]=node=f[node];
		}
		//Print route
		printf("   Route is:");
		for(i=0;i<size;i++)
			writeNodeI(graph,route[i]);
		printf("\n");
		free(route);
	}
}
//Tree methods
void getHeight(){
	binaryTree *tree;
	tree=loadBinaryTree("menu/problems/301.txt");
	if(tree==NULL)
		return ;
	printf("   The height of this tree is %u.",binaryTreeGetHeight(tree));
}
void binaryTreeCover(){
	binaryTree *tree;
	tree=loadBinaryTree("menu/problems/302.txt");
	if(tree==NULL)
		return ;
	//Call cover methods
	FILE *out=fopen("outputs/302.txt","w");
	fprintf(out,"NLR:\n%s\n\n",NLR(tree));
	fprintf(out,"LNR:\n%s\n\n",LNR(tree));
	fprintf(out,"LRN:\n%s",LRN(tree));
	fclose(out);
	printf("   The result has been saved in outputs/302.txt.");
	//Clear memory
	free(tree);
}
//Switch
void selectProblem(int category){
	int key;
	char directory[]="menu/1.txt";
	directory[5]=category+48;
	do{
		printTextFrom(directory);
		scanf("%d",&key);
		switch(category*100+key){
			//Non-oriented graph
			case 101: breathFirstSearch(); break;
			case 102: deepFirstSearch(); break;
			case 103: eulerianCicle(); break;
			case 104: hamiltonianCicle(); break;
			//Oriented graph
			case 201: travellerProblem(); break;
			case 202: royFloyd(); break;
			case 203: dijkstra(); break;
			//Tree
			case 301: getHeight(); break;
			case 302: binaryTreeCover(); break;
		}
		short newLine=0;
		if(key){
			switch(category){
				case 1: newLine=(key<5); break;
				case 2:	newLine=(key<4); break;
				case 3: newLine=(key<3); break;
			}
		}
		if(newLine)
			printf("\n");
	}while(key);
}


 */

 /* Binary Trees

 binaryTree *binaryTreeSetKey(binaryTree *tree,Key key){
	tree=(binaryTree*)malloc(sizeof(binaryTree));
	tree->left=NULL;
	tree->right=NULL;
	tree->key=key;
	return tree;
}
binaryTree *addNodeToLeft(binaryTree *tree,int value,Key key){
	if(tree->key.value==value){
		tree->left=(struct binaryTree*)binaryTreeSetKey((binaryTree*)tree->left,key);
		return tree;
	}
	if(tree->left!=NULL){
		tree->left=(struct binaryTree*)addNodeToLeft((binaryTree*)tree->left,value,key);
	}
	if(tree->right!=NULL){
		tree->right=(struct binaryTree*)addNodeToLeft((binaryTree*)tree->right,value,key);
	}
	return tree;
}
binaryTree *addNodeToRight(binaryTree *tree,int value,Key key){
	if(tree->key.value==value){
		tree->right=(struct binaryTree*)binaryTreeSetKey((binaryTree*)tree->right,key);
		return tree;
	}
	if(tree->left!=NULL){
		tree->left=(struct binaryTree*)addNodeToRight((binaryTree*)tree->left,value,key);
	}
	if(tree->right!=NULL){
		tree->right=(struct binaryTree*)addNodeToRight((binaryTree*)tree->right,value,key);
	}
	return tree;
}
//Covering methods
char *NLR(binaryTree *tree){
	if(tree!=NULL){
		char *string;
		string=(char*)malloc(sizeof(char)*100);
		memset(string,0,100);
		//Node
		strcpy(string,addSpace(intToString(tree->key.value)));
		//Left
		if(tree->left!=NULL)
			strcat(string,NLR((binaryTree*)(tree->left)));
		//Right
		if(tree->right!=NULL)
			strcat(string,NLR((binaryTree*)(tree->right)));
		return string;
	}
	return "";
}
char *LNR(binaryTree *tree){
	if(tree!=NULL){
		char *string;
		string=(char*)malloc(sizeof(char)*100);
		memset(string,0,100);
		strcpy(string,"");
		//Left
		if(tree->left!=NULL)
			strcat(string,LNR((binaryTree*)(tree->left)));
		//Node
		strcat(string,addSpace(intToString(tree->key.value)));
		//Right
		if(tree->right!=NULL)
			strcat(string,LNR((binaryTree*)(tree->right)));
		return string;
	}
	return "";
}
char *LRN(binaryTree *tree){
	if(tree!=NULL){
		char *string;
		string=(char*)malloc(sizeof(char)*100);
		memset(string,0,100);
		strcpy(string,"");
		//Left
		if(tree->left!=NULL)
			strcat(string,LRN((binaryTree*)(tree->left)));
		//Right
		if(tree->right!=NULL)
			strcat(string,LRN((binaryTree*)(tree->right)));
		//Node
		strcat(string,addSpace(intToString(tree->key.value)));
		return string;
	}
	return "";
}
unsigned binaryTreeGetHeight(binaryTree *tree){
	if(tree==NULL)
		return 0;
	return max(1+binaryTreeGetHeight((binaryTree*)(tree->left)),1+binaryTreeGetHeight((binaryTree*)(tree->right)));
}
//Input/Output methods
binaryTree *loadBinaryTree(char *directory){
	//Print instructions
	printTextFrom(directory);
	//Get data
	return binaryTreeReadFromFile(selectFileDirectory());
}
binaryTree *binaryTreeReadFromFile(char *directory){
	FILE *in=fopen(directory,"r");
	if(!in){
        perror("   File opening failed!");
        return NULL;
    }
	//Get number of nodes
	unsigned n,i,r;
	fscanf(in,"%u",&n);
	fscanf(in,"%u",&r);
	int *left, *right;
	//Get left
	left=(int*)malloc(sizeof(int)*n);
	for(i=0;i<n;i++)
		fscanf(in,"%d",&left[i]);
	//Get right
	right=(int*)malloc(sizeof(int)*n);
	for(i=0;i<n;i++)
		fscanf(in,"%d",&right[i]);
	fclose(in);
	//Build tree
	binaryTree *tree;
	Key key;
	key.value=r;
	tree=binaryTreeSetKey(tree,key);
	short find;
	do{
		find=0;
		for(i=0;i<n;i++){
			if(left[i]){
				key.value=left[i];
				find=1;
				left[i]=0;
				tree=addNodeToLeft(tree,i+1,key);
			}
			if(right[i]){
				key.value=right[i];
				find=1;
				right[i]=0;
				tree=addNodeToRight(tree,i+1,key);
			}
		}
	}while(find);
	return tree;
}
 */

 /*

unsigned isLinked(Graph graph,unsigned i,unsigned j){
	if(isOriented(graph))
		if(graph.tie[i].a==graph.tie[j].a||graph.tie[i].b==graph.tie[j].b)
			return 1;
	return (graph.tie[i].b==graph.tie[j].a||graph.tie[i].a==graph.tie[j].b);
}
unsigned isOriented(Graph graph){
	return (graph.oriented);
}
unsigned getTie(Graph graph,unsigned a,unsigned b){
	if(a==b)
		return 0;
	unsigned i;
	//Oriented graph
	if(isOriented(graph)){
		for(i=0;i<graph.m;i++){
			if(graph.tie[i].a==a&&graph.tie[i].b==b)
				return 1;
		}
	}else{
	//Non-oriented graph
		for(i=0;i<graph.m;i++){
			if(graph.tie[i].a==a&&graph.tie[i].b==b)
				return 1;
			else if(graph.tie[i].a==b&&graph.tie[i].b==a)
				return 1;
		}
	}
	return 0;
}
unsigned getCost(Graph graph,unsigned a,unsigned b){
	if(a==b)
		return 0;
	unsigned i;
	//Oriented graph
	if(isOriented(graph)){
		for(i=0;i<graph.m;i++){
			if(graph.tie[i].a==a&&graph.tie[i].b==b)
				return graph.tie[i].cost;
		}
	}else{
	//Non-oriented graph
		for(i=0;i<graph.m;i++){
			if(graph.tie[i].a==a&&graph.tie[i].b==b)
				return graph.tie[i].cost;
			else if(graph.tie[i].a==b&&graph.tie[i].b==a)
				return graph.tie[i].cost;
		}
	}
	return INF;
}
unsigned **getMatrix(Graph graph){
	unsigned **a,i,j;
	a=(unsigned**)malloc(sizeof(unsigned)*graph.n);
	for(i=0;i<graph.n;i++){
		a[i]=(unsigned*)malloc(sizeof(unsigned)*graph.n);
		for(j=0;j<graph.n;j++){
			a[i][j]=getCost(graph,i,j);
		}
	}
	for(i=0;i<graph.n;i++){
		printf("  \n");
		for(j=0;j<graph.n;j++)
			printf("%u ",a[i][j]);
	}
	return a;
}
*/