using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class hilightcontrolBFS : MonoBehaviour {

    public float[] lineY;   //memoreaza coordonata y a fiecarei linii de cod
    public float speed; //viteza de tranzitie
    public controllerBFS MS;      //main script
    public Color culoare;
    public Vector3 destinatie;
    public Vector3 drum;
    public int sel;
    public Color normal;
    public Color selectat;
    public Color vizitat;
    public Color adiacent;
    public int step = 0;
    public int q;
    public bool[] viz;
    public int[] c;
    public GameObject[] noduri;
    public nod_controlBFS[] ns;
    public SpriteRenderer[] sr;
    public Color hlTrue;
    public Color hlFalse;
    public Color hlColor;   //culoare hilight 
    public GameObject aux;
    public SpriteRenderer cc;
    public Rect[] but;  //pozitii butoane redare
    public Texture2D[] butT;    //texturi butoane redare
    public int PP;
    public GUISkin skin;
    public Rect label;  //pozitie label viteza de rulare
    public GameObject slider;
    public float textFieldN;  //viteza de rulare memorata ca numar real
    public int play;
    public int pas = 1;
    public float st;    //start time
    public Rect dinNou; //pozitie buton restart
    public Text ordineaDeParcurgere;
    public Text coadaTxt;
    public int prim = 0;
    public int ultim = 0;
    public int[] coada;
    public int maxStep;

    int sw;
    int sh;
    int i;

    public struct actiune
    {
        public Vector2 moveTo;
        public Color[] culoareNod;
        public Color hlColor;
        public int[] coada;     //daca s-a eliminat sau s-a adaugat un nod in coada (-1 daca s-a eliminat , 0 daca nu s-a facut nimic, >0 nodul adaugat)
        public int adaugat;     //daca se incepe pargurgerea dintrun nou nod(s-a adaugat un nod la parcurgere)
        public int dim;         //dimensiunea cozii
    }

    actiune[] steps = new actiune[1000];

    void Start()
    {
        MS = GameObject.Find("menu").GetComponent<controllerBFS>();
        destinatie = transform.position;
        destinatie += new Vector3(0, 0, 2);
        drum = destinatie;
        transform.position = destinatie;
        cc = GetComponent<SpriteRenderer>();
        cc.color = culoare;
        but = new Rect[3];
        PP = 1;

        //atribuiri
        sw = Screen.width;
        sh = Screen.height;
        textFieldN = 1f;


        //initializari
        viz = new bool[MS.q + 1];
        c = new int[MS.q + 1];
        coada = new int[MS.q + 1];
        noduri = new GameObject[MS.q + 1];
        ns = new nod_controlBFS[MS.q + 1];
        sr = new SpriteRenderer[MS.q + 1];

        for (int i = 1; i <= MS.q; i++)
        {
            noduri[i] = GameObject.Find("nod " + i.ToString());
            if (noduri[i] != null)
            {
                ns[i] = noduri[i].GetComponent<nod_controlBFS>();
                sr[i] = noduri[i].GetComponent<SpriteRenderer>();
            }
        }

        for (int i = 0; i < 1000; i++)
        {
            steps[i].culoareNod = new Color[MS.q + 1];
            steps[i].coada = new int[MS.q + 1];
        }

        GameObject aux;
        hlColor = hlTrue;

        bfs(sel);
        setStep(1);
    }

    public void setStep(int I) //seteaza pasul cu numarul I
    {
        int i;

        if (I > maxStep)
            maxStep = I;

        destinatie = steps[I].moveTo;
        hlColor = steps[I].hlColor;
        for (i = 1; i <= MS.q; i++)
            if (MS.ex[i])
                schimbaCuloare(i, steps[I].culoareNod[i]);

        coadaTxt.text = "Coada: ";
        for (i = 0; i <= steps[I].dim; i++)
            coadaTxt.text = coadaTxt.text + steps[I].coada[i] + ' ';


        if (steps[I].adaugat != -1 && I==maxStep)
            ordineaDeParcurgere.text = ordineaDeParcurgere.text + steps[I].adaugat.ToString() + ' ';

    }

    void schimbaCuloare(int nod, Color culoare)
    {
        noduri[nod].GetComponent<SpriteRenderer>().color = culoare;
    }

    Vector2 goToLine(int i) //returneaza pozitia randului i
    {
        return new Vector2(drum.x, lineY[i]);
    }

    void getStep(int movePos, Color color, int adaugat)   //memoreaza pasul actual
    {
        step++;
        for (int i = 1; i <= MS.q; i++)
        {
            if (MS.ex[i])
            {
                aux = noduri[i];
                steps[step].culoareNod[i] = aux.GetComponent<SpriteRenderer>().color;
            }
        }
        steps[step].hlColor = color;
        steps[step].moveTo = goToLine(movePos);
        for (int i = prim; i <= ultim; i++)
            steps[step].coada[i - prim] = c[i];
        steps[step].dim = ultim - prim;
        steps[step].adaugat = adaugat;
    }

    int varf;
    void bfs(int nod)
    {
        prim = ultim = 0;
        c[0] = nod;
        getStep(2, hlTrue, nod);

        viz[nod] = true;
        schimbaCuloare(nod, vizitat);
        getStep(3, hlTrue, -1);
        
        while(prim<=ultim)
        {
            getStep(4, hlTrue, -1);

            varf = c[prim];
            schimbaCuloare(varf, selectat);
            getStep(5, hlTrue, -1);



            for(i=1;i<=MS.q;i++)
                if(MS.adiacenta[varf][i])
                {
                    schimbaCuloare(i, adiacent);
                    getStep(6, hlTrue, -1);

                    if (!viz[i])
                    {
                        getStep(7, hlTrue, -1);

                        c[++ultim] = i;
                        getStep(8, hlTrue, i);

                        viz[i] = true;
                        schimbaCuloare(i, vizitat);
                        getStep(9, hlTrue, -1);
                    }
                    else
                    {
                        getStep(7, hlFalse, -1);
                        schimbaCuloare(i, vizitat);
                    }

                }

            prim++;
            getStep(10, hlTrue, -1);

            schimbaCuloare(varf, vizitat);
        }

        getStep(4, hlFalse, -1);

    }

    void Update()
    {

        if (play == 1)
        {
            if (Time.time > 1 / textFieldN + st && pas < step)
            {
                setStep(++pas);
                st = Time.time;
            }
        }

        transform.position = Vector2.Lerp(transform.position, destinatie, Time.deltaTime * textFieldN * 5); //miscare hilight
        cc.color = Color.Lerp(cc.color, hlColor, Time.deltaTime * textFieldN * 5);  //transformare culoare hilight
    }

    public void schimbaViteza(float V)
    {
        textFieldN = V;
    }

}
