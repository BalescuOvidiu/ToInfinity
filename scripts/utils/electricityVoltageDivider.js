/*
bool readResistors(MAX,RESISTORS,string directory){
	double value;
	ifstream in(directory.c_str());
	if(in.is_open()){
		in>>maxCombination;
		maxCombination++;
		while(!in.eof()){
			in>>value;
			r.push_back(value);
		}
		in.close();
		return 1;
	}
	in.close();
	return 0;
}
void buildCombination(MAX,RESISTORS,COMBINATION){
	// Alloc memory
	parallel.clear();
	series.clear();
	id.clear();
	vector<unsigned> selection;
	// Get combination
	for(unsigned n=1;n<maxCombination;n++){
		selection.resize(n,0);
		id.push_back(selection);
		unsigned i=n-1;
		while(selection[0]+1<r.size()){
			if(selection[i]+1<r.size()){
				selection[i]++;
			}
			else if(i){
				unsigned j=i;
				while(selection[j]+1==r.size()){
					j--;
				}
				selection[j]++;
				for(unsigned k=j+1;k<=i;k++){
					selection[k]=selection[j];
				}
			}
			// Add combination
			id.push_back(selection);
		}
		selection.clear();
	}
	// Get values
	parallel.resize(id.size(),0);
	series.resize(id.size(),0);
	for(unsigned i=0;i<id.size();i++){
		for(unsigned j=0;j<id[i].size();j++){
			parallel[i]+=1/r[id[i][j]];
			series[i]+=r[id[i][j]];
		}
		parallel[i]=1/parallel[i];
	}
}
unsigned long getCompatible(MAX,RESISTORS,ID,vector<double> &v,const double &resistance,ofstream &out){
	// v is generated combination of resistors: paralel or series.
	unsigned long best=0;
	for(unsigned n=1;n<maxCombination;n++){
		unsigned long min=0;
    	for(unsigned i=1;i<v.size();i++){
    		if(id[i].size()==n){
    			if(fabs(resistance-v[i])<fabs(resistance-v[min])){
    				min=i;
    			}
    		}
    		else if(id[i].size()>n){
    			if(v[best]*id[best].size()<v[min]*id[min].size()){
    				best=min;
    			}
    			break;
    		}
    	}
		// Print
		OUT("  "<<v[min]);
		OUT(" :");
		for(unsigned j=0;j<id[min].size();j++){
			OUT(" "<<r[id[min][j]]);
		}
		OUT("\n");
	}
	return best;
}
unsigned long getDecimals(double value){
	value-=fabs(floor(value));
	while(floor(value)!=value){
		value*=10;
	}
	return (unsigned)value;
}
String unit(double value,String name){
	unsigned decimals=getDecimals(value);
	if(value>=1000000){
		if(decimals){
			return String(to_string((unsigned long)value/1000000))+String(".")+String(to_string(decimals))+String("m")+name;
		}
		return String(to_string((unsigned long)value/1000000))+String("m")+name;
	}
	else if(value>=1000){
		if(decimals){
			return String(to_string((unsigned long)value/1000))+String("."+to_string(decimals))+String("k")+name;
		}
		return String(to_string((unsigned long)value/1000))+String("k")+name;
	}
	if(decimals){
		return String(to_string((unsigned long)value))+String(".")+String(to_string(decimals))+name;
	}
	return String(to_string((unsigned long)value))+name;
}
*/