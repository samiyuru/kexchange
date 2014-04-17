/* 
 * Samiyuru Senarathne
 */

kEX.controller("kexroot", function ($scope, kexPofiles) {
    var user = {
        username: "",
        password: ""
    };
    $scope.isLogged = false;//show loggin background
    $scope.showForm = false;//show loggin form
    $scope.user = user;
    $scope.login = login;

    kexPofiles.validateToken(function (isLoggedin) {
        if (isLoggedin) {
            $scope.isLogged = true;//hide loggin n show home
        } else {
            $scope.showForm = true;//show loggin form
        }
    });

    function login() {
        kexPofiles.authorize(user.username, user.password, function (status) {
            if (status.success) {
                $scope.isLogged = true;
            } else {
                $scope.isLogged = false;
            }
        });
    }
});


kEX.controller("recntErnngsCtrlr", function ($scope) {
    $scope.ernngs = [
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        }
    ];
});

kEX.controller("topErnrsCtrlr", function ($scope) {
    $scope.tpErners = [
        {
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            },
            earning: 10000,
            place: 01
        },
        {
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            },
            earning: 10000,
            place: 02
        },
        {
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            },
            earning: 10000,
            place: 03
        }
    ];
});

kEX.controller("tpWlthyCtrler", function ($scope, kexPofiles) {
    $scope.wlthyPrsns = wlthyPrsns = [];

    kexPofiles.loadProfiles(function loadWlthyPplCB(status) {
        var profiles = status.data;
        var len = profiles.length;
        for (var i = 0; i < len; i++) {
            wlthyPrsns.push(profiles[i]);
        }
    });

});

kEX.controller("coverCtrlr", function ($scope, kexPofiles) {
    kexPofiles.getCurrentProfile(function currentProfile(profile) {
        $scope.profile = profile;
    });
});

kEX.controller("accountCtrl", function ($scope) {
    $scope.accLogs = [
        {
            detail: "Loan from Saman",
            timeago: "1 month ago",
            amount: 300,
            balance: 3000
        },
        {
            detail: "Blog earning",
            timeago: "2 days ago",
            amount: 800,
            balance: 6000
        },
        {
            detail: "Investment in Gayan",
            timeago: "1 week ago",
            amount: 200,
            balance: 7000
        },
        {
            detail: "Loan from Saman",
            timeago: "1 day ago",
            amount: 300,
            balance: 3300
        },
        {
            detail: "Loan from Saman",
            timeago: "1 min ago",
            amount: 200,
            balance: 9000
        },
        {
            detail: "Loan from Saman",
            timeago: "1 hour ago",
            amount: 800,
            balance: 6000
        },
        {
            detail: "Loan from Anil",
            timeago: "1 day ago",
            amount: 40,
            balance: 1000
        }
    ];
});


kEX.controller("newPrdCtrl", function ($scope, kexProducts) {
    var ui = {
        form: false,
        prdctTypes: [
            {
                name: "Session Tickets",
                value: 0
            },
            {
                name: "Knowledge Transfer",
                value: 1
            },
            {
                name: "Code Review",
                value: 2
            },
            {
                name: "Code Help",
                value: 3
            }
        ]
    };

    var newPrdct = {
        name: "",
        detail: "",
        type: 0,
        qty: 1,
        isAuction: false,
        minBid: 0,
        price: "",
        images: [],
        expire: null
    };

    var _creationInProg = false;

    $scope.ui = ui;
    $scope.newPrdct = newPrdct;
    $scope.submitProduct = submitProduct;

    function submitProduct() {
        if (_creationInProg)return;
        _creationInProg = true;
        //isAuction, type, name, detail, qty, price, expire, imgs
        kexProducts.createProduct(newPrdct.isAuction
            , newPrdct.type
            , newPrdct.name
            , newPrdct.detail
            , newPrdct.qty
            , (newPrdct.isAuction) ? newPrdct.minBid : newPrdct.price
            , newPrdct.expire
            , newPrdct.images
            , function (status) {
                if (status.success) {
                    ui.form = false;
                    resetFields();
                }
                _creationInProg = false;
            });
    }

    function resetFields() {
        newPrdct.name = "";
        newPrdct.detail = "";
        newPrdct.type = 0;
        newPrdct.qty = 1;
        newPrdct.isAuction = false;
        newPrdct.minBid = 0;
        newPrdct.price = "";
        newPrdct.images = [];
        newPrdct.expire = null;
    }

});

kEX.controller("mybidsctrl", function ($scope) {
});