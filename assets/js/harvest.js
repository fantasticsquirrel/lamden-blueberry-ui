const detail = JSON.stringify({
    appName: 'Harvest',
    version: '0.0.1',
    logo: 'logo.png',
    contractName: 'con_harvest_002',
    networkType: 'mainnet',
})

var address = "";
var contract = "con_harvest_002";
var all_plants_balances;
var all_plants;
var plants_of_address = [];
var locked = true;
var current_action = "";
var current_action_arg = "";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


function get_plants(){
$.getJSON("https://blockservice.nebulamden.finance/current/all/"+contract+"/collection_balances", function (plants) {
    all_plants_balances = plants[contract]["collection_balances"];
   
    $.getJSON("https://blockservice.nebulamden.finance/current/all/"+contract+"/collection_nfts", function (plants) {
        
        all_plants = plants[contract]["collection_nfts"];
        

        for(plant in all_plants_balances[address]){
            let data_of_plant = all_plants[plant];
            plants_of_address.push({
                key:   plant,
                value: data_of_plant
            });
        }
        console.log(plants_of_address);
        if(plants_of_address.length > 0){
            $("#plants").html("");
            plants_of_address.forEach(function (plant, index) {
                $("#plants").append('<li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg"> <div class="d-flex flex-column"> <h6 class="mb-3 text-sm">'+plant["key"]+'</h6> <span class="mb-2 text-xs">Water: <span class="text-dark font-weight-bold ms-sm-2">'+plant["value"]["nft_metadata"]["current_water"]+'/100</span><a class="btn btn-link text-dark ps-3 mb-0 water-btn" data-plant="'+plant["key"]+'" style="padding:0" href="javascript:;"><i class="fas fa-water text-dark me-2" aria-hidden="true"></i>Water</a></span> <span class="mb-2 text-xs">Photosynthesis: <span class="text-dark font-weight-bold ms-sm-2">'+plant["value"]["nft_metadata"]["current_photosynthesis"]+'/100</span><a class="btn btn-link text-dark ps-3 mb-0 growlights-btn" data-plant="'+plant["key"]+'" style="padding:0" href="javascript:;"><i class="fas fa-lightbulb text-dark me-2" aria-hidden="true"></i>Growlights</a><a class="btn btn-link text-dark ps-3 mb-0 shade-btn" style="padding:0" data-plant="'+plant["key"]+'" href="javascript:;"><i class="fas fa-umbrella-beach text-dark me-2" aria-hidden="true"></i>Shade</a></span> <span class="mb-2 text-xs">Bugs: <span class="text-dark font-weight-bold ms-sm-2">'+plant["value"]["nft_metadata"]["current_bugs"]+'/100</span><a class="btn btn-link text-dark ps-3 mb-0 squash-btn"  data-plant="'+plant["key"]+'" style="padding:0" href="javascript:;"><i class="fas fa-shoe-prints text-dark me-2" aria-hidden="true"></i>Squash</a><a class="btn btn-link text-dark ps-3 mb-0 spray-btn"  data-plant="'+plant["key"]+'" style="padding:0" href="javascript:;"><i class="fas fa-spray-can text-dark me-2" aria-hidden="true"></i>Spray</a></span> <span class="mb-2 text-xs">Nutrients: <span class="text-dark font-weight-bold ms-sm-2">'+plant["value"]["nft_metadata"]["current_nutrients"]+'/100</span><a class="btn btn-link text-dark ps-3 mb-0 fertilize-btn"  data-plant="'+plant["key"]+'" style="padding:0" href="javascript:;"><i class="fas fa-bowl-rice text-dark me-2" aria-hidden="true"></i>Fertilize</a></span> <span class="mb-2 text-xs">Weeds: <span class="text-dark font-weight-bold ms-sm-2">'+plant["value"]["nft_metadata"]["current_weeds"]+'/100</span><a class="btn btn-link text-dark ps-3 mb-0 pull-btn" style="padding:0" data-plant="'+plant["key"]+'" href="javascript:;"><i class="fas fa-hand-back-fist text-dark me-2" aria-hidden="true"></i>Pull</a><a class="btn btn-link text-dark ps-3 mb-0 spray-2-btn" style="padding:0"  data-plant="'+plant["key"]+'" href="javascript:;"><i class="fas fa-spray-can text-dark me-2" aria-hidden="true"></i>Spray</a></span> <span class="mb-2 text-xs">Toxicity: <span class="text-dark font-weight-bold ms-sm-2">'+plant["value"]["nft_metadata"]["current_toxicity"]+'/100</span></span> <span class="mb-2 text-xs">Burned Plant: <span class="text-dark font-weight-bold ms-sm-2">'+plant["value"]["nft_metadata"]["burn_amount"]+'/100</span></span> </div></li>');
              });
                
        }
        else if(plants_of_address.length == 0 && locked == false && address != undefined && address != ""){
            $("#plants").html("");
            $("#plants").append('<li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg"> <div class="d-flex flex-column" style=" width: 100%; "> <h6 class="mb-3 text-sm text-center" style=" ">You do not own any plants</h6> </div> <div class="ms-auto text-end"> </div> </li>');
        }
    
    });
        
});
}




document.addEventListener('lamdenWalletInfo', (response) => {
    
    //console.log(response);
    if (response.detail.errors === undefined) {
        address = response.detail.wallets[0];
        if (response.detail.locked == true) {
            locked = true;
            $("#connect_wallet_text").text("Wallet is locked");
            $("#buy_a_plant_text").text("Wallet is locked");

            $("#connect_wallet_text_2").text("Wallet is locked");
            $("#connect_wallet_text_3").text("Wallet is locked");
            $("#connect_wallet_text_4").text("Wallet is locked");


            $("#swap").text("Wallet is locked");
            $("#swap").attr("disabled", true).addClass("ui-state-disabled");

            $("#buy_a_plant_text").text("Wallet is locked");
            $("#buy_a_plant_text").attr("disabled", true).addClass("ui-state-disabled");
        }
        else {
            locked = false;
            $("#connect_wallet_text").text("Connected");
            $("#connect_wallet_text_2").text("Connected");
            $("#connect_wallet_text_3").text("Connected");
            $("#connect_wallet_text_4").text("Connected");

            $("#swap").attr("disabled", false).removeClass("ui-state-disabled");
            $("#swap").text("swap");
            $("#buy_a_plant_text").attr("disabled", false).removeClass("ui-state-disabled");
            $("#buy_a_plant_text").text("Buy a Plant");
        }
    }get_plants();
});

$(document).ready(function () {
    document.dispatchEvent(new CustomEvent('lamdenWalletGetInfo'));
});

$("#connect_wallet_text").click(function () {
    document.dispatchEvent(new CustomEvent('lamdenWalletConnect', { detail }));
});

$("#buy_plant").click(function () {
    MicroModal.show('modal-buy');
});

$('body').on('click', 'a.water-btn', function() {
    let plant = this.getAttribute('data-plant');
    let gen = plant.split("_")[1];
    let plant_id = plant.split("_")[2];
    const detail = JSON.stringify({
        contractName: contract,
        methodName: 'water',
        networkType: 'mainnet',
        kwargs: {
            plant_generation: Number(gen),
            plant_number: Number(plant_id)
        },

        stampLimit: 200,
    });
    document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
});

$('body').on('click', 'a.squash-btn', function() {
    let plant = this.getAttribute('data-plant');
    let gen = plant.split("_")[1];
    let plant_id = plant.split("_")[2];
    const detail = JSON.stringify({
        contractName: contract,
        methodName: 'squash',
        networkType: 'mainnet',
        kwargs: {
            plant_generation: Number(gen),
            plant_number: Number(plant_id)
        },

        stampLimit: 200,
    });
    document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
});
$('body').on('click', 'a.shade-btn', function() {
    let plant = this.getAttribute('data-plant');
    let gen = plant.split("_")[1];
    let plant_id = plant.split("_")[2];
    const detail = JSON.stringify({
        contractName: contract,
        methodName: 'shade',
        networkType: 'mainnet',
        kwargs: {
            plant_generation: Number(gen),
            plant_number: Number(plant_id)
        },

        stampLimit: 200,
    });
    document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
});

$('body').on('click', 'a.fertilize-btn', function() {
    let plant = this.getAttribute('data-plant');
    let gen = plant.split("_")[1];
    let plant_id = plant.split("_")[2];
    const detail = JSON.stringify({
        contractName: contract,
        methodName: 'fertilize',
        networkType: 'mainnet',
        kwargs: {
            plant_generation: Number(gen),
            plant_number: Number(plant_id)
        },

        stampLimit: 200,
    });
    document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
});

$('body').on('click', 'a.pull-btn', function() {
    let plant = this.getAttribute('data-plant');
    let gen = plant.split("_")[1];
    let plant_id = plant.split("_")[2];
    const detail = JSON.stringify({
        contractName: contract,
        methodName: 'fertilize',
        networkType: 'mainnet',
        kwargs: {
            plant_generation: Number(gen),
            plant_number: Number(plant_id)
        },

        stampLimit: 200,
    });
    document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
});

$('body').on('click', 'a.spray-btn', function() {
    let plant = this.getAttribute('data-plant');
    let gen = plant.split("_")[1];
    let plant_id = plant.split("_")[2];
    const detail = JSON.stringify({
        contractName: "currency",
        methodName: 'approve',
        networkType: 'mainnet',
        kwargs: {
            amount: Number(4.75),
            to: contract
        },

        stampLimit: 200,
    });
    document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
    current_action = "spraybugs"
    current_action_arg = [gen, plant_id]
});

$('body').on('click', 'a.spray-2-btn', function() {
    let plant = this.getAttribute('data-plant');
    let gen = plant.split("_")[1];
    let plant_id = plant.split("_")[2];
    const detail = JSON.stringify({
        contractName: "currency",
        methodName: 'approve',
        networkType: 'mainnet',
        kwargs: {
            amount: Number(4.75),
            to: contract
        },

        stampLimit: 200,
    });
    document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
    current_action = "sprayweeds"
    current_action_arg = [gen, plant_id]
});

$('body').on('click', 'a.growlights-btn', function() {
    let plant = this.getAttribute('data-plant');
    let gen = plant.split("_")[1];
    let plant_id = plant.split("_")[2];
    const detail = JSON.stringify({
        contractName: "currency",
        methodName: 'approve',
        networkType: 'mainnet',
        kwargs: {
            amount: Number(4.75),
            to: contract
        },

        stampLimit: 200,
    });
    document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
    current_action = "growlights"
    current_action_arg = [gen, plant_id]
});

$("#buy_button").click(function () {
    let name = $("#new_plant_name").val();
    const detail = JSON.stringify({
        contractName: "currency",
        methodName: 'approve',
        networkType: 'mainnet',
        kwargs: {
            amount: Number(475),
            to: contract
        },

        stampLimit: 200,
    });
    document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
    current_action = "buy";
    current_action_arg = name;
});




document.addEventListener('lamdenWalletTxStatus', (response) => {
    
    if (response.detail.data.resultInfo.title == "Transaction Pending" && response.detail.data.txInfo.methodName == "approve") {
        setTimeout(function () {
            if(current_action == "growlights"){
                const detail = JSON.stringify({
                    contractName: "currency",
                    methodName: 'approve',
                    networkType: 'mainnet',
                    kwargs: {
                        amount: Number(0.25),
                        to: "9ab69d2caa0c14886d462ef4756d7b61b3b81cfb5968f738e6b8c321959e248a"
                    },
            
                    stampLimit: 200,
                });
                document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
                current_action = "growlights_approved";
            }
            if(current_action == "growlights_approved"){
                const detail = JSON.stringify({
                    contractName: contract,
                    methodName: 'growlights',
                    networkType: 'mainnet',
                    kwargs: {
                        plant_generation: Number(current_action_arg[0]),
                        plant_number: Number(current_action_arg[1])
                    },
            
                    stampLimit: 200,
                });
                document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
                current_action = "";
                current_action_arg = "";
            }
            if(current_action == "spraybugs"){
                const detail = JSON.stringify({
                    contractName: "currency",
                    methodName: 'approve',
                    networkType: 'mainnet',
                    kwargs: {
                        amount: Number(0.25),
                        to: "9ab69d2caa0c14886d462ef4756d7b61b3b81cfb5968f738e6b8c321959e248a"
                    },
            
                    stampLimit: 200,
                });
                document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
                current_action = "spraybugs_approved";
            }
            if(current_action == "spraybugs_approved"){
                const detail = JSON.stringify({
                    contractName: contract,
                    methodName: 'spraybugs',
                    networkType: 'mainnet',
                    kwargs: {
                        plant_generation: Number(current_action_arg[0]),
                        plant_number: Number(current_action_arg[1])
                    },
            
                    stampLimit: 200,
                });
                document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
                current_action = "";
                current_action_arg = "";
            }
            if(current_action == "sprayweeds"){
                const detail = JSON.stringify({
                    contractName: "currency",
                    methodName: 'approve',
                    networkType: 'mainnet',
                    kwargs: {
                        amount: Number(0.25),
                        to: "9ab69d2caa0c14886d462ef4756d7b61b3b81cfb5968f738e6b8c321959e248a"
                    },
            
                    stampLimit: 200,
                });
                document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
                current_action = "sprayweeds_approved";
            }
            if(current_action == "sprayweeds_approved"){
                const detail = JSON.stringify({
                    contractName: contract,
                    methodName: 'sprayweeds',
                    networkType: 'mainnet',
                    kwargs: {
                        plant_generation: Number(current_action_arg[0]),
                        plant_number: Number(current_action_arg[1])
                    },
            
                    stampLimit: 200,
                });
                document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
                current_action = "";
                current_action_arg = "";
            }

            if(current_action == "buy"){
                const detail = JSON.stringify({
                    contractName: "currency",
                    methodName: 'approve',
                    networkType: 'mainnet',
                    kwargs: {
                        amount: Number(25),
                        to: "9ab69d2caa0c14886d462ef4756d7b61b3b81cfb5968f738e6b8c321959e248a"
                    },
            
                    stampLimit: 200,
                });
                document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
                current_action = "buy_approved";
            }
            if(current_action == "buy_approved"){
                const detail = JSON.stringify({
                    contractName: contract,
                    methodName: 'buy_plant',
                    networkType: 'mainnet',
                    kwargs: {
                        nick: current_action_arg
                    },
            
                    stampLimit: 200,
                });
                document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
                current_action = "";
                current_action_arg = "";
            }

        }, 2000);

    }
    if (response.detail.data.resultInfo.title == "Transaction Pending" && response.detail.data.txInfo.methodName == "buy_plant") {
        setTimeout(function () {


            location.reload();

        }, 2000);

    }

    if (response.detail.data.resultInfo.title == "Transaction Pending" && response.detail.data.txInfo.methodName == "water") {
        setTimeout(function () {


            location.reload();

        }, 2000);

    }
    if (response.detail.data.resultInfo.title == "Transaction Pending" && response.detail.data.txInfo.methodName == "squash") {
        setTimeout(function () {


            location.reload();

        }, 2000);

    }
    if (response.detail.data.resultInfo.title == "Transaction Pending" && response.detail.data.txInfo.methodName == "spraybugs") {
        setTimeout(function () {


            location.reload();

        }, 2000);

    }
    if (response.detail.data.resultInfo.title == "Transaction Pending" && response.detail.data.txInfo.methodName == "growlights") {
        setTimeout(function () {


            location.reload();

        }, 2000);

    }
    if (response.detail.data.resultInfo.title == "Transaction Pending" && response.detail.data.txInfo.methodName == "shade") {
        setTimeout(function () {


            location.reload();

        }, 2000);

    }
    if (response.detail.data.resultInfo.title == "Transaction Pending" && response.detail.data.txInfo.methodName == "fertilize") {
        setTimeout(function () {


            location.reload();

        }, 2000);

    }
    if (response.detail.data.resultInfo.title == "Transaction Pending" && response.detail.data.txInfo.methodName == "pullweeds") {
        setTimeout(function () {


            location.reload();

        }, 2000);

    }
    if (response.detail.data.resultInfo.title == "Transaction Pending" && response.detail.data.txInfo.methodName == "sprayweeds") {
        setTimeout(function () {


            location.reload();

        }, 2000);

    }
    
});
