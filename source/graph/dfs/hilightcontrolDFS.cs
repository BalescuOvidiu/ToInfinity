using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class hilightcontrolDFS : MonoBehaviour {

    public float[] lineY;   //memoreaza coordonata y a fiecarei linii de cod
    public float speed; //viteza de tranzitie
    public controllerDFS MS;      //main script
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
    public GameObject[] noduri;
    public nod_controlDFS[] ns;
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
    public int maxStep;

    int sw;
    int sh;

    public struct actiune
    {
        public Vector2 moveTo;
        public Color[] culoareNod;
        public Color hlColor;
        public int adaugat; //daca se incepe pargurgerea dintrun nou nod(s-a adaugat un nod la parcurgere)
    }

    actiune[] steps = new actiune[1000];

    void Start()
    {
        MS = GameObject.Find("menu").GetComponent<controllerDFS>();
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
        noduri = new GameObject[MS.q + 1];
        ns = new nod_controlDFS[MS.q + 1];
        sr = new SpriteRenderer[MS.q + 1];

        for (int i = 1; i <= MS.q; i++)
        {
            noduri[i] = GameObject.Find("nod " + i.ToString());
            if (noduri[i] != null)
            {
                ns[i] = noduri[i].GetComponent<nod_controlDFS>();
                sr[i] = noduri[i].GetComponent<SpriteRenderer>();
            }
        }

        for (int i = 0; i < 1000; i++)
            steps[i].culoareNod = new Color[MS.q + 1];

        GameObject aux;
        for (int i = 1; i <= MS.q; i++)
        {
            aux = GameObject.Find("nod " + i.ToString());
            if (aux != null)
                aux.GetComponent<nod_controlDFS>().skin.label.normal.textColor = Color.red;
        }
        hlColor = hlTrue;

        dfs(sel);
        getStep(3, hlFalse,-1);
        setStep(1);
    }

    public void setStep(int I) //seteaza pasul cu numarul I
    {
        if (I > maxStep)
            maxStep = I;

        destinatie = steps[I].moveTo;
        hlColor = steps[I].hlColor;
        for (int i = 1; i <= MS.q; i++)
            if (MS.ex[i])
                schimbaCuloare(i, steps[I].culoareNod[i]);

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

    void getStep(int movePos, Color c, int adaugat)   //memoreaza pasul actual
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
        steps[step].hlColor = c;
        steps[step].moveTo = goToLine(movePos);
        steps[step].adaugat = adaugat;
    }

    void dfs(int nod)
    {
        schimbaCuloare(nod, selectat);
        getStep(1, hlTrue, nod);
        viz[nod] = true;
        schimbaCuloare(nod, vizitat);
        getStep(2, hlTrue, -1);
        for (int i=1;i<=MS.q;i++)
            if(MS.adiacenta[nod][i])
            {
                schimbaCuloare(i, adiacent);
                getStep(3, hlTrue, -1);
                if (!viz[i])
                {
                    getStep(4, hlTrue, -1);
                    dfs(i);
                }
                else
                {
                    getStep(4, hlFalse, -1);
                    schimbaCuloare(i, vizitat);
                }
            }
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
