using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class UI : MonoBehaviour {

    public controller MS;   //main script
    public hilightControl HC;

    public GameObject dupaPornire;
    public InputField nodDePornire;
    public string selS;
    public Button PP;   //play/pause
    public Button muta;
    private Text mutaTxt;
    public Button sterge;
    public Button stergeM;
    private Text stergeTxt;
    public Sprite play;
    public Sprite pause;
    public GameObject hilight;

    public Color pressed;
    public Color relased;
    public Color PT;    //pressed text
    public Color RT;    //relased text

    void Start()
    {
        //atribuiri
        MS = GameObject.Find("menu").GetComponent<controller>();
        HC = hilight.GetComponent<hilightControl>();
        nodDePornire = GameObject.Find("nod de pornire").GetComponent<InputField>();
        mutaTxt = muta.GetComponentInChildren<Text>();
        stergeTxt = sterge.GetComponentInChildren<Text>();
    }

    public void porneste()
    {
        Text errMes = GameObject.Find("error mesage").GetComponent<Text>();

        if (MS.sel < 1 || !MS.ex[MS.sel])
        {
            errMes.text = "Nu exista acest nod!";
        }
        else
        {
            MS.startDijkstra = true;
            MS.hilight.GetComponent<hilightControl>().sel = MS.sel;
            MS.script.SetActive(true);
            errMes.text = null;
            dupaPornire.active = true;
            GameObject.Find("inainte de pornire").active=false;
        }
    }

    public void mutaNod()
    {
        MS.mutaNodActive = !MS.mutaNodActive;

        schimbaStare(muta, MS.mutaNodActive);

        if (!MS.mutaNodActive)
            MS.ok = true;

        MS.stergeNodActive = false;
        MS.stergeMuchieActive = false;

        schimbaStare(sterge, false);
        schimbaStare(stergeM, false);
    }

    public void stergeNod()
    {
        MS.stergeNodActive = !MS.stergeNodActive;

        schimbaStare(sterge, MS.stergeNodActive);

        if (!MS.stergeNodActive)
            MS.ok = true;

        MS.mutaNodActive = false;
        MS.stergeMuchieActive = false;

        schimbaStare(muta, false);
        schimbaStare(stergeM, false);
    }

    public void stergeMuchie()
    {
        MS.stergeMuchieActive = !MS.stergeMuchieActive;

        schimbaStare(stergeM, MS.stergeMuchieActive);

        if (!MS.stergeMuchieActive)
            MS.ok = true;

        MS.mutaNodActive = false;
        MS.stergeNodActive = false;

        schimbaStare(muta, false);
        schimbaStare(sterge, false);

    }

    public void nodDePlecare()
    {
        
        selS = nodDePornire.text;
        int.TryParse(selS, out MS.sel);
        if (MS.sel > MS.q)
            MS.sel /= 10;
        selS = MS.sel.ToString();
        nodDePornire.text = selS;
    }

    public void reset()
    {
        Application.LoadLevel(Application.loadedLevel);
    }

    public void backward()
    {
        PP.image.overrideSprite = play;
        HC.play = 0;
        if (HC.pas > 1)
            HC.setStep(--HC.pas);
        Debug.Log("ok");
    }

    public void playPause()
    {
        if (PP.image.overrideSprite == play)
        {
            PP.image.overrideSprite = pause;
            HC.play = 1;
        }
        else
        {
            PP.image.overrideSprite = play;
            HC.play = 0;
            HC.st = Time.time;
        }
    }

    public void forward()
    {
        PP.image.overrideSprite = play;
        HC.play = 0;
        if (HC.pas < HC.step)
            HC.setStep(++HC.pas);
    }

    public void inapoiLaMeniu()
    {
        Application.LoadLevel(0);
    }

    void schimbaStare(Button B, bool stare)
    {
        if (stare)
        {
            B.image.color = pressed;
            B.GetComponentInChildren<Text>().color = PT;
        }
        else
        {
            B.image.color = relased;
            B.GetComponentInChildren<Text>().color = RT;
        }
    }

}
