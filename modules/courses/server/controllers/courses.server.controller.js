'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Course = mongoose.model('Course'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.mud = function (req, res) {
  console.log('MUD');

/*  var students = [
    ['AABAÏDA', 'Souhaïl', '16244'], ['ABO EL-KHER', 'Hazem', '15102'], ['ABRAK', 'Ilias', '15153'], ['ACHIR', 'Houssine', '16319'],
    ['ADAKALEM', 'Teerooven', '16335'], ['ADRIAENS', 'Arnaud', '15046'], ['AENAN', 'Oussama', '16263'], ['AHALLOUCHE', 'Amine', '16103'],
    ['AHANNACH', 'Abdelmounaim', '16112'], ['ÂHDI', 'Ibrahim', '16069'], ['AÏFA', 'Antoine', '16082'], ['AKEMINOU', 'Nakponse', '15319'],
    ['AKTAS', 'Bahadir', '16192'], ['AL-SAYED', 'Nazir', '15365'], ['ALVAREZ LOPEZ', 'Juan', '16308'], ['AMANAKI', 'Mustapha', '15152'],
    ['ANANABA', 'Mathieu', '15109'], ['AOULAD JILALI', 'Mohamed', '16372'], ['ARCICHOWSKI', 'Adrian', '15119'], ['ARGYRAKIS', 'Yannis', '16133'],
    ['ATAF', 'Mohamed', '16285'], ['ATAYI-GUÈDÈGBÉ', 'Yasmine', '16233'], ['AVILES GUERRERO', 'Kevin', '16255'], ['AZOUZI', 'Rayane', '16081'],
    ['AZZABI', 'Mohamed', '15078'], ['AZZI', 'Mossaab', '16079'], ['BAHRI', 'Bilal', '16252'], ['BAJAIT', 'Walid', '16288'],
    ['BALAHOUANE', 'Samuel', '16063'], ['BARRY', 'Kadiatou', '16326'], ['BAS', 'Kemal', '15183'], ['BEKTESHI', 'Alban', '15212'],
    ['BELFOUL', 'Marwa', '15080'], ['BEN ABDALLAH', 'Mohammed', '16154'], ['BEN ABDELLAH', 'Samir', '15143'], ['BEN ALLAL', 'Anas', '16145'],
    ['BEN HAMMOU', 'Fayssal', '16111'], ['BENAAMAN', 'Mohamed', '16061'], ['BENALI', 'Ouassima', '15022'], ['BESHIR', 'Ahmed', '16289'],
    ['BILODEAU-LAMONTAGNE', 'Arthur', '16012'], ['BLAVIER', 'Antoine', '16165'], ['BOENKI', 'Joanne', '15070'], ['BOHNICSEK', 'Logan', '16297'],
    ['BONMARCHAND', 'Léo', '16222'], ['BONNEWYN', 'Maxime', '16182'], ['BORTOLOZZI', 'Tom', '16334'], ['BOUBNANE', 'Hamza', '15303'],
    ['BOUDDOUNT', 'Wassime', '15060'], ['BOUGHABA', 'Bassam', '16137'], ['BOUHLAL', 'Youssef', '15210'], ['BOULAICH KASMI', 'Redouane', '16098'],
    ['BOURGEOIS', 'Yoleen', '16164'], ['BOURNOUSOUZIS', 'Christos', '16219'], ['BOUSFIA', 'Mourad', '16340'], ['BOUSIAALI', 'Yassin', '15285'],
    ['BOUZAIENNE', 'Zakia', '16175'], ['BRANCART', 'Laurent', '16153'], ['BRIARD', 'Ludovic', '15116'], ['BRIGODE', 'Ferdinand', '15170'],
    ['BUCH', 'Keanu', '16151'], ['BUELEN', 'Maxime', '16162'], ['CALUGAR', 'Darius-Andrei', '15146'], ['CAPELLE', 'Elise', '16184'],
    ['CHAKIR', 'Zakaria', '16179'], ['CHALMAGNE', 'Simon', '16113'], ['CHARLIER', 'Elise', '16249'], ['CHARLIER', 'Guillaume', '16247'],
    ['CHEHAIMA', 'Noureddine', '16316'], ['CHELAGHMI', 'Jabir', '16309'], ['CHERBAKOV', 'Alexis', '16171'], ['CHOQUET', 'Nathan', '15098'],
    ['COÊLHO DE SOUSA NETO', 'Ezio', '16284'], ['COLIN', 'Thibault', '16039'], ['COPPOLA', 'Lorenzo', '15151'], ['CORDIER', 'Maxime', '15103'],
    ['COUTINHO MEIRELES', 'Bruno', '15280'], ['CROONEN', 'Benoît', '16097'], ['DAHRI', 'Ibrahim', '16049'], ['DAL', 'Bastien', '15139'],
    ['DALI', 'Mohamed', '16159'], ['DAMOUNI', 'Jaouad', '16328'], ['DARDOUR', 'Mohammed', '16361'], ['DE BOCK', 'Cyril', '16068'],
    ['DE CARTIER D\'YVES', 'Arnold', '15217'], ['DE CORDES', 'Augustin', '15101'], ['DE GROOTE', 'Olivier', '16027'], ['DE LANGH', 'Nicolas', '16099'],
    ['DE MEEÛS D\'ARGENTEUIL', 'Julien', '16028'], ['DE MEEÛS D\'ARGENTEUIL', 'Nicolas', '16086'], ['DE PELSEMAEKER', 'Julien', '16168'],
    ['DE SAUVAGE', 'Alexandre', '16109'], ['DE SCHIETERE DE LOPHEM', 'Mathias', '15154'], ['DE THEUX DE MEYLANDT ET MONTJARDIN', 'Brieuc', '16031'],
    ['DE THEUX DE MEYLANDT ET MONTJARDIN', 'Léon', '15325'], ['DE VLAEMINCK', 'Mathieu', '16100'], ['DE VLEESCHOUWER', 'Valentin', '15013'],
    ['DE WAEL', 'Guillaume', '16295'], ['DE WIN', 'Guillaume', '16363'], ['DE WOUTERS DE BOUCHOUT', 'Florian', '16217'],
    ['DE WOUTERS D\'OPLINTER', 'Nicolas', '15090'], ['DEBELLE', 'Aloïs', '16304'], ['DEBOECK', 'Maxence', '16238'], ['DECOO', 'Maxime', '16248'],
    ['DEFFO', 'Arthur', '16324'], ['DELEERS', 'Mathieu', '15079'], ['DELLA FAILLE DE LEVERGHEM', 'Erwan', '16130'], ['DELVAUX', 'Thibault', '16189'],
    ['DELVIGNE', 'Alexandre', '16066'], ['DEMAERSCHALK', 'Jonathan', '16084'], ['DEMIROK', 'Kübra', '16123'], ['DEMUYSER', 'Gauthier', '16286'], ['DENAYER', 'Louis', '16318'],
    ['DENDANA', 'Kaireddine', '16150'], ['DENEYER', 'Guillaume', '14110'], ['DHUICQUE', 'Guillaume', '16223'], ['DIALLO', 'Thierno', '16134'], ['DIEU', 'François-Xavier', '16022'],
    ['DJEUFACK', 'Bidias', '16322'], ['DJOUKA', 'Merveille', '16329'], ['DODELET', 'Gaëtan', '16183'], ['DUCHÂTEAU', 'Lukas', '16320'], ['DUCOULOMBIER', 'Théo', '16067'],
    ['D\'UDEKEM D\'ACOZ', 'Stanislas', '16231'], ['DUERINCK', 'Archibald', '16038'], ['DUFRASNE', 'Corentin', '16043'], ['DUPIN', 'Iouri', '16065'],
    ['DUPONT', 'Maël', '16016'], ['EL AISSAOUI', 'Omar', '15222'], ['EL AKHAL', 'Maroin', '15252'], ['EL AOUATI', 'Abdel', '16364'], ['EL AYADI', 'Najim', '16310'],
    ['EL BAGHDADI', 'Nabil', '14247'], ['EL BAKKALI', 'Mohammed', '16156'], ['EL BAKKOURY', 'Yassine', '16050'], ['EL BEKKAOUI', 'Rayan', '15041'], ['EL HACHIOUI', 'Atiq', '16283'],
    ['EL HADDADI', 'Yassine', '16146'], ['EL HAJJAMI', 'Ali', '16054'], ['EL HAJJIOUI', 'Hamza', '16267'], ['EL KABIR', 'Anas', '15353'], ['EL KADIRI', 'Nabil', '15225'],
    ['EL KAHTAOUI', 'Youssef', '16094'], ['EL KARROUMI', 'Sofiane', '16202'], ['EL KHOUZAMI', 'Salim', '16269'], ['EL YAHIAOUI', 'El-Hassane', '15284'],
    ['EL YAHIAOUI', 'El-Houssaïne', '15309'], ['EL YATTOUTI', 'Khalid', '15069'], ['ELENS', 'Yannick', '16046'], ['EL-KHAZNAGI', 'Adil', '16341'], ['ELVETICI', 'Benjamin', '15011'],
    ['EMPAIN', 'Cédric', '16085'], ['ENGLEBERT DE TORNACO', 'Cyprien', '16072'], ['ENNASSIR', 'Youssef', '16229'], ['ERGO', 'Aurélien', '16195'], ['ERRABAH', 'Adil', '16172'],
    ['ERREMBAULT DU MAISNIL ET DU COUTRE', 'Arnaud', '16140'], ['ESSAKKALI', 'Yassin', '16160'], ['ESSALHI', 'Younes', '16339'], ['ESSANGA', 'Essobo', '16353'], ['FENSIE', 'Florian', '16073'],
    ['FERMON', 'Rayan', '15088'], ['FERONT', 'Arnaud', '16330'], ['FIASSE', 'Julien', '16143'], ['FIJALKOWSKI', 'Richard', '15260'], ['FLAMANT', 'Pierre', '16017'],
    ['FLAMMANG', 'Nicolas', '16264'], ['FOKO\'O DJOUA', 'Arnaud', '16337'], ['FORGEUR', 'Guillaume', '16132'], ['FRYNS', 'Jimmy', '16095'], ['FTOUH', 'Nadir', '16121'],
    ['FUSILLIER', 'Elie', '16245'], ['GAITAN', 'Ionatan', '16191'], ['GALAIS', 'Simon', '16104'], ['GALLET', 'Thomas', '16003'], ['GALLOIS', 'Nathan', '16215'],
    ['GALY', 'Thomas', '16053'], ['GÉRARD', 'Julien', '16259'], ['GERIN', 'Nicolas', '15228'], ['GERONDAL', 'Sébastien', '16366'], ['GHILAN', 'Ayoub', '16196'],
    ['GHYSELINCK', 'Benjamin', '16120'], ['GILLARD', 'Jeremy', '15096'], ['GILLET', 'Clément', '16228'], ['GORJON', 'Julien', '16119'], ['GOVAERTS', 'Thomas', '16163'],
    ['GOYENS', 'Margaux', '15121'], ['GRAY', 'Owen', '16047'], ['GROSZEK', 'Bartosz', '15237'], ['GUÉNARD', 'Gaëtan', '16378'], ['GUEULETTE', 'Arnaud', '16127'],
    ['GÜLER', 'Semih', '16287'], ['GYSEN', 'Nathan', '16209'], ['HAJDARI', 'Suleiman', '15292'], ['HAJJAJ', 'Hamza', '15211'], ['HALLAL', 'Mohamed', '16062'],
    ['HALLET', 'Célestin', '15052'], ['HALLOY', 'Thomas', '16203'], ['HARMS', 'Xavier', '16379'], ['HECHT', 'Guillaume', '16122'], ['HERMAN', 'Denis', '16208'],
    ['HESPEL', 'Armand', '16106'], ['HEYMANS', 'Martin', '15043'], ['HODAIBI', 'Wassil', '16078'], ['HOEBEKE', 'Daan', '15105'], ['HOSSELET', 'Antoine', '16356'],
    ['HOURIYÉ', 'Rami', '15110'], ['HUART', 'Oscar', '16307'], ['ILUNGA SULU', 'Félicien', '15219'], ['IMERI', 'Doris', '16270'], ['JAAFARI', 'Yasser', '15075'], ['JABBOUR', 'Hanâ', '15087'],
    ['JACQUERYE', 'Antoine', '16161'], ['JAGARI', 'Wissam', '16034'], ['JANUS', 'Rémy', '16042'], ['JERID', 'Sami', '15035'], ['JERROUDI', 'Ayoub', '16025'],
    ['KALLI', 'Sofiane', '15327'], ['KARA', 'Zülfikar Ali', '15033'], ['KARANGWA', 'Clément', '16225'], ['KARNEICHIK', 'Stanislav', '15034'], ['KAROUAY', 'Mehdi', '16055'],
    ['KASID', 'Ilyas', '16350'], ['KASSABEH', 'Zakariya', '16131'], ['KASTRATI', 'Ardian', '15323'], ['KAYEMBE', 'Jason', '16348'], ['KELECOM', 'Madeleine', '16216'],
    ['KENFACK NGUETSA', 'Cédric', '16365'], ['KETBI', 'Si', '15289'], ['KHADRI', 'Abderrahmane', '16118'], ['KHAZOUM', 'Noelle', '16290'], ['KIES', 'William', '15158'],
    ['KINGJI', 'Sabah', '16218'], ['KINSCH', 'Willy', '16351'], ['KORKUT', 'Caner', '16373'], ['KOSTENKO', 'Oleksandr', '15223'], ['LAAKEL SEFET', 'Bilal', '16036'],
    ['LAFFUT', 'Simon', '16032'], ['LAHJIRA', 'Mohamed', '16026'], ['LAKRAKCHI', 'Marwan', '16236'], ['LAMBERT', 'Antoine', '16280'], ['LAMBERT', 'Thomas', '15253'],
    ['LAMBORAY', 'Max-Othello', '16338'], ['LAPORTE', 'Robin', '16292'], ['LAROUSSI', 'Aimane', '16210'], ['LE RAY', 'Cyril', '15094'], ['LEFEBVRE', 'Jimmy', '15040'],
    ['LEGRAIN', 'Alexis', '16177'], ['LEJEUNE', 'Victor', '16305'], ['LEMMENS', 'Lucas', '16254'], ['LHOEST', 'Victor', '16009'], ['L\'HOIR', 'Xavier', '16004'],
    ['LIBERT', 'Justin', '15005'], ['LIMAUGE', 'Benjamin', '16194'], ['LOHEST VAN DER LINDEN D\'HOOGHVORST', 'Gabriel', '16205'], ['LOVERIUS', 'Bruno', '16136'],
    ['LUCION', 'Nathan', '15199'], ['LUTETE BAVOVADIO', 'Herman', '15042'], ['MAISIN', 'Victor', '15148'], ['MAKHOUKHI', 'Soufiane', '16070'], ['MALEWO', 'Kanda', '16080'],
    ['MALLET', 'Arthur', '16279'], ['MARAFKO', 'Oscar', '14064'], ['MARCHANT', 'Olivier', '16035'], ['MARCOLINI', 'Luca', '15122'], ['MARTINET', 'Benoît', '15084'],
    ['MARY', 'Samuel', '16114'], ['MASSAÂDI', 'Kawtar', '16033'], ['MASSART', 'Maxime', '16071'], ['MASSON', 'Sara', '15083'], ['MATEOS DEL VALLE', 'Jorge', '15301'],
    ['MATERNE', 'Tristan', '15259'], ['MATHIEU', 'François', '16037'], ['MBOMA', 'Donny', '16087'], ['MCHAOURI', 'Sara', '16005'], ['MEKCHOUCHE', 'Wissem', '16258'],
    ['MENGHOUM', 'Yassir', '16020'], ['MERCIER', 'Nathan', '15092'], ['MEZDAOUI', 'Mohamed', '16093'], ['MIEL', 'Jonathan', '16013'], ['MISSOTTEN', 'Ivan', '15097'],
    ['MOENAERT', 'Gilles', '16272'], ['MOENS DE HASE', 'Thibaud', '15036'], ['MOLI', 'Jozef', '15189'], ['MONFORT', 'Nicolas', '15295'], ['MUHAREMI', 'Erzen', '16129'],
    ['MUKAM', 'Romaric', '16204'], ['MUNIZ VITE', 'Carlos', '16088'], ['MUNOZ COUTINHO', 'Nicolas', '16303'], ['MUSUNGAYI', 'Victor', '16282'], ['NABER', 'Timothy', '15073'],
    ['NAZARKO', 'Dawid', '16152'], ['NDJADI KENDOMBE', 'Junior', '16314'], ['NGUYEN', 'Khac', '16293'], ['NIOKA PONCIN', 'Nathan', '16197'], ['NKAMLA DJOUKOUO', 'Eveline', '4144'],
    ['NOËL', 'Colin', '15062'], ['NOUNE', 'Claude', '16296'], ['NOUR', 'Nada', '16091'], ['NSIS', 'Ilias', '16331'], ['NZORUBARA', 'Maxime', '16198'], ['OCTORS', 'Lucas', '16274'],
    ['OFFERGELD', 'Lucas', '16224'], ['OUALI', 'Fares', '16220'], ['OZKARA', 'Kadir', '16075'], ['PALAZZO', 'Fabio', '16213'], ['PECHEUR', 'Renaud', '16200'], ['PINET', 'Hadrien', '15019'],
    ['PIROTTE', 'Dimitri', '16044'], ['QUINTENS', 'Anthony', '15142'], ['RABEUX', 'Adrien', '16125'], ['RAHMAN', 'Onik', '15126'], ['REKIK', 'Heni', '16281'],
    ['RENAUT', 'Alexandre', '15039'], ['RENAUX', 'Florian', '16059'], ['RHANJATI', 'Othmane', '16261'], ['RIVIÈRE', 'Stijn', '15061'], ['RODRIGUE', 'Julien', '16313'],
    ['ROGGE', 'Vincent', '16277'], ['ROUSSEAU', 'Fabian', '16376'], ['RUBBENS', 'Pierre', '16181'], ['RUMMENS', 'Vadim', '15270'], ['RUYSSEN', 'Martin', '15352'],
    ['SAAD', 'José', '16369'], ['SACKO', 'Cheik', '16275'], ['SALBAOUI', 'Mostafa', '16374'], ['SAMYN', 'Victor', '15136'], ['SARGSYAN', 'Trdat', '16007'],
    ['SARSARI', 'Abdellah', '16141'], ['SBAI TANGI', 'Soulaimane', '16315'], ['SCARITO', 'Michaël', '16117'], ['SCHVARTZ', 'Nathan', '16291'], ['SELLAM-OUEL-HAJ', 'Mehdi', '15195'],
    ['SEURRE', 'Pierre-Jean', '15032'], ['SEYNAEVE', 'Alexandre', '16169'], ['SHALA', 'Hil', '16268'], ['SIAKOUDIS', 'Vassily', '16173'], ['SIMON', 'Vincent', '16360'],
    ['SING', 'Martin', '16116'], ['SIQUET', 'Loris', '16135'], ['SMITS', 'Victor', '16107'], ['SNYERS D\'ATTENHOVEN', 'Harold', '16243'],
    ['SOARES LIMA', 'Alain', '16211'], ['SOLON', 'Elisa', '16158'], ['SOYSAL', 'Deniz', '15030'], ['SPADIN', 'Sacha', '16206'], ['STEINIER', 'Mathieu', '15163'],
    ['STINGLHAMBER', 'Cyril', '16306'], ['STONSKA', 'Nathan', '16294'], ['STOUFFS', 'John', '16074'], ['STYPA', 'Aaron', '15240'],
    ['TAHMASEBI', 'Nicky', '15006'], ['TAHRI', 'Moussa', '16239'], ['TCHAPTCHET SEUPA', 'Chabert', '16124'], ['TELESE IZZI', 'Alberto', '16008'],
    ['TERLINDEN', 'Damien', '16176'], ['TERMOTE', 'Mathias', '16370'], ['TESSARO', 'Arnaud', '15245'], ['TEUDJOU TADONLEKEU', 'Parfait', '16257'],
    ['THEYS', 'Guillaume', '15316'], ['THIRY', 'François', '16019'], ['TITART', 'Loïck', '16041'], ['TOMALA', 'Emanuel', '16262'], ['TOTH', 'Frank', '16193'],
    ['TOURNEUR', 'Bernard', '16148'], ['TRAN', 'Anthony', '16349'], ['TREIGNER', 'Anthony', '16155'], ['TUDA', 'Aurel', '16253'], ['TUFINO LOPEZ', 'Gissela', '15077'],
    ['TURCHET', 'Guillaume', '16014'], ['ULGER', 'Cibril', '16298'], ['ÜNLÜ', 'Fatma', '16045'], ['VAERNEWYCK', 'Alexandre', '16199'], ['VALENTIN', 'Basile', '16077'],
    ['VALENTIN', 'Tom', '16018'], ['VAN DEN NESTE', 'Bastien', '16327'], ['VAN der AVOORT', 'Jérôme', '16052'], ['VAN DER ELST', 'Thomas', '16030'],
    ['VAN DYCK', 'Anthony', '16265'], ['VAN KEER', 'Louis', '16089'], ['VAN OOSTENRYCK', 'Julien', '16040'], ['VAN OUTRYVE D\'YDEWALLE', 'Diego', '16092'],
    ['VAN OYE', 'Guillaume', '15287'], ['VAN RENTERGHEM', 'Julien', '15257'], ['VAN ROY', 'Louis', '16357'], ['VAN SPROLANT', 'Edouard', '15334'],
    ['VANDAELE', 'Mathias', '15182'], ['VANDERFELT', 'Marie', '16138'], ['VANDERMEULEN', 'Guillaume', '15125'], ['VANDERMIES', 'Charles', '15123'],
    ['VANDERSTAPPEN', 'Anaïs', '16180'], ['VANHAELEN', 'Grégoire', '16345'], ['VANROY', 'Guillaume', '16057'], ['VERBURGH', 'Clément', '16207'],
    ['VERDEYEN', 'Chloé', '15215'], ['VEREECKE', 'Kevin', '15194'], ['VEREERTBRUGGHEN', 'Jordy', '16242'], ['VERSCHRAEGEN', 'Julie', '16108'],
    ['VERVOORT', 'Dylan', '16023'], ['VICO', 'Nathan', '16273'], ['VINIKAS', 'Michaël', '16321'], ['WAHAB', 'Zaki', '16126'],
    ['WALLEYN SPITS', 'Nicolas', '16102'], ['WESTER', 'Martin', '16358'], ['WILLEMS', 'Mathieu', '16226'], ['YAGLI', 'Berkay', '16251'],
    ['YERLÈS', 'Nathan', '16090'], ['ZEBDI', 'Achraf', '15354'], ['ZEDZIAN', 'Pawel', '16144'], ['ZEHARI', 'Meriem', '16128'],
    ['ZEIHER', 'Dilan', '16250'], ['ZIELENIEWSKI', 'Michel', '16051'], ['ZOUHARI', 'Mehdi', '16240']
  ];*/

  var students = [['ABDESSATER', 'Maxime', '15258'], ['ABELOOS', 'Damien', '13241'], ['AL BADAOUI', 'Aâmir', '14305'], ['AMEZIANI', 'Nadir', '14143'], ['ANDRÉ', 'Raphael', '15134'], ['BALANT', 'Aline', '14148'], ['BARRY', 'Saïkou Ahmadou', '14055'], ['BEARD', 'Julien', '15172'], ['BECQUEREAU', 'Mathilde', '14316'], ['BEDORET', 'Charles-Albert', '15262'], ['BEN ADDI', 'Yassin', '14075'], ['BEN HADDI', 'Jaber', '15359'], ['BEN MOUSSA', 'Fatine', '14354'], ['BENHADI', 'Nabil', '14326'], ['BERRAJ JUEID', 'Moncef', '14063'], ['BERTIEAUX', 'Pierre-Olivier', '15340'], ['BERTRAND', 'Sam', '15027'], ['BIELDERS', 'Nelson', '14260'], ['BIEY BIBANSO', 'Charly', '14279'], ['BLONDIAU', 'Benoît', '14082'], ['BORREY', 'Sylvain', '14285'], ['BOUHOUT', 'Youness', '16234'], ['BOURGUIGNON', 'Maxime', '16299'], ['BROODCOORENS', 'Maxime', '14297'], ['CARLIER', 'Rémy', '15286'], ['CLESSE', 'Nathan', '15068'], ['COLLARD', 'Léopold', '14275'], ['CRAPPE', 'Martin', '14060'], ['CRUYT', 'Hadrien', '15058'], ['CUMPS', 'Romain', '15310'], ['CUPI', 'Ilir', '12239'], ['DALE', 'François', '14167'], ['DAOUDI', 'Souhail', '16323'], ['DE BOECK', 'Cyprien', '14132'], ['de BROUCHOVEN de BERGEYCK de NAMUR d\'ELZEE', 'Louis', '13077'], ['DE CONINCK', 'Thibault', '15065'], ['de CROMBRUGGHE de LOORINGHE', 'Victor', '14105'], ['DE HEMPTINNE', 'Matthieu', '15335'], ['DE KEYSER', 'Olivier', '15016'], ['de MOFFARTS', 'Guillaume', '14004'], ['DE PAPE', 'Alexandre', '16256'], ['de SCHIETERE de LOPHEM', 'Jacques', '13080'], ['DE VIRON', 'Harold', '15131'], ['de VIRON', 'Manoëlle', '14147'], ['DEGELDT', 'Martin', '15076'], ['DEKEYSER', 'Valentin', '15047'], ['DELATTE', 'Hadrien', '15120'], ['DELAUNOIS', 'Ernest', '14186'], ['DELCORTE', 'Kilian', '14053'], ['DELVINGT', 'Julien', '15196'], ['DENIS', 'Maxime', '15089'], ['DEWIJN', 'Lucas', '15271'], ['DJOKO KENMOGNE', 'Isaac', '14299'], ['DOAT', 'Augustin', '14205'], ['DOROT', 'Daniel-Beniamin', '15127'], ['DRESSE', 'Sébastien', '15174'], ['DREZE', 'Anthony', '15232'], ['DRÈZE', 'Quentin', '14213'], ['DUFILS', 'Alexandre', '15017'], ['EL AYADI', 'Soufiane', '15055'], ['EL JILALI', 'Adam', '15268'], ['EL-ABBASSI', 'Ilias', '15236'], ['FACHE ALVAREZ', 'Luc', '14014'], ['FRYCIA', 'Thierry', '14212'], ['GARIN', 'Léonard', '14153'], ['GAUTIER', 'Arthur', '15305'], ['GLORIA', 'Salem', '13281'], ['GODART', 'Nicolas', '14219'], ['GOSSART', 'Thomas', '16336'], ['HANNOUNI', 'Houda', '15056'], ['HENNAUT', 'Robin', '15031'], ['HEYMANS', 'Charles', '15015'], ['HORVATH', 'Sebastien', '15045'], ['IKALULU', 'Hugues', '13226'], ['JAMBOR', 'Matthias', '15014'], ['JEBARI', 'Othmane', '15044'], ['JONCKHEERE', 'Max', '14069'], ['JOSSART', 'Antoine', '15117'], ['KAUFMAN', 'Robin', '15008'], ['KIRSTEIN', 'Julien', '14136'], ['KISS', 'Thibault', '13262'], ['KOLAWOLE', 'Abdoulaye', '14084'], ['KRASOWSKI', 'Marcin', '13169'], ['KUE', 'Guy', '14312'], ['LAMINE', 'Antoine', '14183'], ['LATINIS', 'Alexis', '14020'], ['LEEMANS', 'Corian', '14268'], ['LENAERTS', 'Aymeric', '15118'], ['LEUNIS', 'Léo', '15241'], ['LITTLE', 'Nathan', '14200'], ['LOOP', 'Harold', '15201'], ['LOOR', 'Elise', '14010'], ['LOSSEAU', 'François', '16185'], ['LUYCKX', 'Charles', '14011'], ['MARDI', 'Najim', '15218'], ['MAZOUNI', 'Imane', '13251'], ['MEAUX', 'Baptiste', '14071'], ['MENDOZA ALONSO', 'Javier', '13023'], ['MEREL', 'Ludovic', '14066'], ['MOHAMMAD', 'Zain Sheikh', '15095'], ['MOMO KUATCHE', 'Guy', '13161'], ['MONFORT', 'Benoît', '13089'], ['MOSSERAY', 'Hugo', '15294'], ['MOTTET', 'Hugues-Evremond', '14168'], ['M\'RINI', 'Ilias', '15235'], ['MROUE', 'Hussein', '15106'], ['MROUE', 'Mohamad', '15107'], ['NGUEPING', 'Parco', '11022'], ['NGUETSOP VOUFO', 'Alain', '15239'], ['NICODÈME', 'Louis', '14173'], ['NICODÈME', 'Romain', '14155'], ['NOUBISSIE KOUODIE KOUONG', 'Jean', '15320'], ['NOUHI', 'Fatima', '16354'], ['NUHIC', 'Ramo', '14142'], ['OUALI-DADA', 'Sirine', '14145'], ['PAQUES', 'Robin', '15332'], ['PEDROSO', 'Ornella', '16332'], ['PEETERS', 'Arnaud', '16266'], ['PERL', 'Inès', '15007'], ['PICQUET', 'Maximilien', '15351'], ['PIRAUX', 'Lucien', '15082'],
  ['PIROTTE', 'Antoine', '15144'], ['PIRSOUL', 'Alexandre', '15141'], ['RACI', 'Tomor', '13200'], ['RAXHON', 'Elise', '15171'], ['REINERTZ', 'Laurent', '12196'], ['RELECOM', 'Valérian', '14135'], ['RENARD', 'Eve', '15229'], ['RIOUCH', 'Majid', '15221'], ['ROBA', 'Emilien', '15037'], ['RYAN', 'Andrew', '16024'], ['SAMIH', 'Tawfik', '15231'], ['SELLESLAGH', 'Lionel', '13158'], ['SIMON', 'Christophe', '15149'], ['STILMANT', 'Julien', '14054'], ['TCHIMTCHOUA NGANMOUE', 'Champlain', '16311'], ['THIEBAUT', 'Eric', '15064'], ['THOMAS', 'Léopold', '15012'], ['TOUHAMI', 'Ilias', '13029'], ['TOUSSAINT', 'Danny', '13131'], ['TRIPS', 'Jérémy', '14122'], ['van CAUBERGH', 'Alexandre', '13159'], ['VAN DER ELST', 'Augustin', '15250'], ['van der GRACHT de ROMMERSWAEL', 'Henry', '14163'], ['VAN HEES', 'Emmanuel', '14221'], ['VAN VYNCKT', 'Arnaud', '15227'], ['VAN WEYENBERGH', 'Niels', '13372'], ['VANDENHOEKE', 'Victor', '15166'], ['VANDENKERCKHOVEN', 'Antoine', '15091'], ['VANDEPOELE', 'Diego', '15059'], ['VERHELLEN', 'Elodie', '16276'], ['VERHOFSTADT', 'Jordan', '14125'], ['VOLS', 'Yannick', '14036'], ['WAELES', 'Florian', '15190'], ['WAERSEGGERS', 'Louis', '14093'], ['YOUSFI', 'Yassir', '14051'], ['ZARKIK', 'Saber', '14034'], ['ZEMMOURI', 'Farah', '15216'], ['ZERHOUNI-ABDOU', 'Ibrahim', '15129'], ['ZHAO', 'Qingqing', '14038'], ['ZHOU', 'Danjie', '14255'], ['ALBERT', 'Emile', '14022'], ['ANIZET', 'Thomas', '14164'], ['BARRERA VEGA', 'Juan', '14309'], ['CASTERMANS', 'Charles', '14094'], ['CHAGNOT', 'William', '14151'], ['DAVID', 'Mathieu', '14102'], ['DE DECKER', 'William', '14130'], ['DE KEYZER', 'Paolo', '13201'], ['de LAMINNE de BEX', 'Hélène', '13239'], ['EL ALAMI', 'Ismaël', '11126'], ['GURU', 'Gaétan', '14243'], ['HACHEZ', 'Hadrien', '15306'], ['HAGOPIAN', 'Armen', '14040'], ['KABEMBA', 'Ndelela', '14250'], ['KESSELS', 'Julien', '16214'], ['LEKENS', 'Amaury', '14027'], ['LEMENU', 'Valentin', '14019'], ['LENAERTS', 'Alexandre', '13055'], ['MUGABO PITIE', 'Hubert', '13022'], ['NOOTENS', 'Alexis', '16139'], ['PETIT', 'Jonathan', '13026'], ['PUISSANT BAEYENS', 'Victor-Emmanuel', '12098'], ['SELLESLAGH', 'Tom', '14161'], ['SEUWA NDOMJOU', 'Omer', '11242'], ['SWOLFS', 'Robin', '15297'], ['VANDENBUSSCHE', 'Benjamin', '13152'], ['WÉRY', 'Benoît', '14256'], ['BALZA', 'Ludovic', '13050'], ['BEN KHATER', 'Jihed', '16190'], ['BENNOUALI', 'Abdellah', '12280'], ['BHATTI', 'Iqbal', '11116'], ['BOUJAID', 'Adil', '14016'], ['BOULAC', 'Amro', '14333'], ['DAUSIMONT', 'Kevin', '13003'], ['DE CEULENEER', 'Anne', '13061'], ['de JAMBLINNE de MEUX', 'Maximilien', '12274'], ['de LAMINNE de BEX', 'Rodolphe', '13209'], ['DEBATTY', 'Louis', '12193'], ['DECROCK', 'Julie', '13065'], ['DEMAERSCHALK', 'Bastien', '13194'], ['DETRY', 'François', '14046'], ['DOCKX', 'William', '12001'], ['DRUET', 'Antoine', '14089'], ['ECHALLAOUI', 'Younes', '16377'], ['FERRANTE', 'Bruno', '15264'], ['GOETYNCK', 'Grégori', '13110'], ['GOOSSENS', 'Quentin', '12129'], ['JABER', 'Mimoun', '13038'], ['JILOUL', 'Abdessamad', '15336'], ['KAYA', 'Necati', '13261'], ['KOUASSI', 'Kouadio', '15358'], ['LATINNE', 'Sacha', '13304'], ['LOCIGNO', 'Jérôme', '13266'], ['LUYTEN', 'Alexandre', '14114'], ['MARZOUK', 'Hamza', '13189'], ['NOOTENS', 'Xavier', '14287'], ['OERS', 'Reginald', '13192'], ['RENAULD', 'Sébastien', '12178'], ['SCHNEIDER', 'Dylan', '14235'], ['SCHOLASSE', 'Charles', '14188'], ['STRADELLI', 'Maxime', '14290'], ['SWENNEN', 'Louis', '16302'], ['TSHINKENKE VILA', 'Tshink', '15311'], ['VAN HAELEN', 'Alexis', '14223'], ['VANDENSTEEN', 'Florian', '13116'], ['VANGERMEERSCH', 'Basile', '13083'], ['VANTHOURNHOUT', 'Edwin', '12151'], ['AKIN', 'Burak', '13271'], ['ARIAS CHACHALO', 'Gandhy', '12123'], ['BOEGAERTS', 'Olivier', '14286'], ['BORDET', 'Mathieu', '14057'], ['BOUCQUEY', 'Antoine', '14039'], ['BREYNE', 'Louis', '14015'], ['BUCHTA', 'Konrad', '16501'], ['CAGRO', 'Rezan', '12060'], ['CALCUS', 'Tanguy', '13244'], ['CANTARIN COFINO', 'Ivan', '14067'], ['CHARTIER', 'Quentin', '14246'], ['CHENOUILI', 'Abdelkarim', '13186'], ['COLLIN', 'Michaël', '13356'],
  ['CROSBY MUNOZ', 'Rodolfo', '13123'], ['DE CAT', 'François', '14018'], ['de MAHIEU', 'Laurent', '13117'], ['de PIERPONT', 'Alexis', '14149'], ['de SCHRYNMAKERS de DORMAEL', 'Benoît', '13300'], ['de TROOSTEMBERGH-de TROOSTEMBERGH', 'Jérôme', '12125'], ['DELIRE', 'Thibault', '13009'], ['DEMOULIN', 'Antoine', '14031'], ['DENOËL', 'Guillaume', '13024'], ['DERUE', 'Pierre-Henry', '14220'], ['DESOBRY', 'Rémi', '13289'], ['D\'HAESELEER', 'Guillaume', '14134'], ['DJEUKAM', 'Bonaventure', '11145'], ['DJINSI', 'Valery', '13167'], ['DOIGNY', 'Geoffrey', '13268'], ['DRUGMAND', 'Antoine', '14012'], ['EL BOUSKLAOUI', 'Ahmed', '13146'], ['EL HABSAOUI', 'Younes', '13298'], ['FLAMENT', 'Joachim', '13291'], ['GHEQUIERE', 'Brieuc', '13249'], ['GILLYNS', 'Emmanuel', '14270'], ['GUENNOUN ESSABBAN', 'Khaled', '13139'], ['HAMMOUD', 'Mariam', '14225'], ['HARPIGNY', 'Gauthier', '12362'], ['HERBERT', 'Louis', '14129'], ['KABAKAMANY MAMBA KALALA', 'Lionnel', '13206'], ['KABORE', 'Youssouf', '13111'], ['LEEMANS', 'Bastian', '14269'], ['LEKEMO TENANGUE', 'Alex', '12382'], ['LHONORÉ', 'Tom', '14030'], ['LIBAMBU-MAWUSSE', 'Samuel', '13072'], ['LINCÉ', 'Joachim', '15324'], ['MAMANGA LEMVO', 'Jordan', '14068'], ['MAZY', 'Lara', '14189'], ['MOÂNE SAHLI', 'Zakaria', '13269'], ['MORTL GARDELLIM', 'Matheus', '14150'], ['NANA WANDJI', 'Rodrick', '12148'], ['NGUEDJUI NOUNE', 'Hervé', '12227'], ['NGUYEN', 'Minh-Truong', '12157'], ['NOEL', 'Bastien', '13137'], ['NOTTE', 'Guillaume', '12093'], ['OUAHHABI', 'Wassime', '11121'], ['OUAZREF', 'Said', '13307'], ['OUEZGHAR', 'Ibrahim', '13141'], ['PALEOLOGU', 'Christian', '13344'], ['PIROTTE', 'Corentin', '13100'], ['PONCIN', 'Amaury', '14289'], ['SAWADOGO', 'Djamil', '15224'], ['SIVACIYAN', 'Grégory', '14238'], ['SOUBIDI', 'Ariane', '15263'], ['SZELAGOWSKI', 'Lucas', '14245'], ['TAKACS', 'Sacha', '14108'], ['TAMO FEZEU', 'Herve', '12066'], ['THIRIFAYS', 'François', '12055'], ['TROCH', 'Gabriel', '14140'], ['VAN DEN HOVE D\'ERTSENRYCK', 'Guillaume', '14029'], ['van SPROLANT', 'Mathieu', '14296'], ['VAN STEENBERGH', 'Thomas', '14095'], ['VANDEKERKHOVE', 'Clément', '14081'], ['VANDENHOVE', 'Thomas', '14028'], ['VERDONCK', 'Alexandre', '14074'], ['VERHEYDEN', 'Nils', '13235'], ['VERMEIREN', 'Geoffroi', '12238'], ['ZEKHNINI', 'Yassine', '13088']];

  console.log(students.length);
  var done = 0;
  for (var i = 0; i < students.length; i++) {
    console.log(students[i]);

    var user = new User();
    user.firstname = students[i][1];
    user.lastname = students[i][0];
    user.email = students[i][2] + '@student.ecam.be';
    user.username = students[i][2];
    user.password = students[i][0] + '-' + students[i][1] + '-' + students[i][2];
    user.roles = ['user', 'student'];
    user.provider = 'local';
    user.displayName = user.firstname + ' ' + user.lastname;

    // Then save the user
    user.save(function (err) {
      if (err) {
        console.log('>>> KO');
        console.log(user.password);
        console.log(err.message);
      } else {
        console.log('>>> OK');
      }
      done++;
      if (done === students.length) {
        res.json({ status: true });
      }
    });
  }
};

/*
 * Generate the team of teachers of a course
 */
function getTeam (course) {
  var team = [];
  course.activities.forEach(function (activity) {
    activity.teachers.forEach(function (teacher) {
      if (!team.some(function (element) { return element.equals(teacher); })) {
        team.push(teacher);
      }
    });
  });
  return team;
}

/**
 * Create a course
 */
exports.create = function (req, res) {
  var course = new Course(req.body);
  course.user = req.user;
  course.coordinator = req.body.coordinator[0];
  course.academicyear = 2016;

  // Generate team of teachers
  Course.populate(course, { path: 'activities', select: 'teachers', model: 'Activity' }, function (err, course) {
    if (err || !course) {
      return res.status(404).send({
        message: 'Error while retrieving information about the course.'
      });
    }

    course.team = getTeam(course);
    course.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }

      res.json(course);
    });
  });
};

/**
 * Show the current course
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var course = req.course ? req.course.toJSON() : {};
  res.json(course);
};

/**
 * Update a course
 */
exports.update = function (req, res) {
  var course = req.course;

  course.code = req.body.code;
  course.name = req.body.name;
  course.coordinator = req.body.coordinator[0];
  course.team = getTeam(course);
  course.description = req.body.description;
  course.activities = req.body.activities;

  course.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(course);
  });
};

/**
 * List of courses
 */
exports.list = function (req, res) {
  var filter = req.query.filter ? req.query.filter : 'all';

  switch (filter) {
    // Load all the courses
    case 'all':
      Course.find({ academicyear: req.session.academicyear }, 'code name coordinator team')
      .populate('coordinator', 'displayName')
      .sort({ code: 1 })
      .exec(function (err, courses) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }

        res.json(courses);
      });
      break;

    case 'teacher':
      Course.find({ academicyear: req.session.academicyear }, 'code name coordinator team')
      .populate('coordinator', 'displayName')
      .sort({ code: 1 })
      .exec(function (err, courses) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }

        var teacherCourses = [];
        courses.forEach(function (course) {
          if (course.coordinator.equals(req.user.id) || course.team.some(function (element) { return element.equals(req.user.id); })) {
            teacherCourses.push(course);
          }
        });
        res.json(teacherCourses);
      });
      break;

    default:
      res.json([]);
  }
};

/**
 * Course middleware
 */
exports.courseByCode = function (req, res, next, code) {
  Course.findOne({ code: code }, 'code name coordinator team description activities')
  .populate('coordinator', 'displayName')
  .populate('team', 'firstname lastname displayName')
  .populate('activities', 'code name teachers')
  .exec(function (err, course) {
    if (err) {
      return next(err);
    }
    if (!course) {
      return res.status(404).send({
        message: 'No course with that identifier has been found.'
      });
    }

    Course.populate(course, { path: 'activities.teachers', select: 'firstname lastname displayName', model: 'User' }, function (err, course) {
      if (err || !course) {
        return res.status(404).send({
          message: 'Error while retrieving information about the course.'
        });
      }

      req.course = course;
      next();
    });
  });
};
