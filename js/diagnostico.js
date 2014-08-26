$(document).ready(function(){
	$('#header').hide();
	setTimeout('Inicio()',4300);
})

function Inicio(){
	$('#divSplash').fadeOut('slow',function(){
		$('#identificacao').trigger('create');
		Restart();
		AddEvents();
		$(this).remove();
	});
}

function Restart(){
	$('form').each(function(){
		this.reset()
	});
	$('body').trigger('create');
	$('#header').show();
	HideInAvaliacaoClinica();
	HideInCritMaiores();
	HideInHemoOrto();
	HideInResult();
}

function HideInAvaliacaoClinica(){
	if(!$('#chkOslerFebre').attr('checked'))
		$('#divTempoFebre').hide();
	if(!$('#rdmOdontologiaSim').attr('checked'))
		$('#divOdonto').hide();
	if(!$('#rdmGenitourinarioSim').attr('checked'))
		$('#divGenitourinario').hide();
	if(!$('#rdmDigestivoSim').attr('checked'))
		$('#divDigestivo').hide();
	$('#aLink').hide();
}

function HideInCritMaiores(){
	if(!$('#chkPersistentePositiva').attr('checked'))
		$('#divHemocultura').hide();
}

function HideInHemoOrto(){
	if(!$('#chkHemoculturaAdm').attr('checked')){
		$('#btnNewHemocultura').fadeOut('slow');
		$('#divHemoculturaDetalhes').fadeOut('slow').children('input').val('');
	}
	if(!$('#chkUroculturaAdm').attr('checked')){
		$('#btnNewUrocultura').fadeOut('slow');
		$('#divUroculturaDetalhes').fadeOut('slow').children('input').val('');
	}
}

function HideInResult(){
	$('#divAntibioticoterapia').hide();
	$('#divTerapiaEmpirica').hide();
	$('#divNaoBateComHemoCultura').hide();
	$('#divNaoBateSemHemoCultura').hide();
	$('#divNaoASuspeita').hide();
}

function AddEvents(){
	//Identificacao
	$('#txtSus').change(ProcuraDadosSUS);
	$('#txtCpf').change(ProcuraDadosCPF);
	
	if($('#txtSus').val().length >0)
		$('#txtSus').trigger('change')
	if($('#txtCpf').val().length >0)
		$('#txtCpf').trigger('change')
		
	//Avaliacao Clinica
	$('#chkOslerFebre').click(function(){
		if(this.checked)
			$('#divTempoFebre').fadeIn();
		else
			$('#divTempoFebre').fadeOut();
	})
		
	$('.baseDuke').click(function(){
		if(this.checked)
			$('#aLink').fadeIn();
		else
			if(!BaseDukeP())
				$('#aLink').fadeOut();
	});
	$('#rdmOdontologiaSim').click(function(){
		$('#divOdonto').fadeIn('slow');
	});
	$('#rdmOdontologiaNao').click(function(){
		$('#divOdonto').fadeOut('slow');
	});
	
	$('#rdmGenitourinarioSim').click(function(){
		$('#divGenitourinario').fadeIn('slow');
	});
	$('#rdmGenitourinarioNao').click(function(){
		$('#divGenitourinario').fadeOut('slow');
	});
	
	$('#rdmDigestivoSim').click(function(){
		$('#divDigestivo').fadeIn('slow');
	});
	$('#rdmDigestivoNao').click(function(){
		$('#divDigestivo').fadeOut('slow');
	});
	
	
	//Criterios Maiores
	$('#chkPersistentePositiva').click(function(){
		if(this.checked)
			$('#divHemocultura').fadeIn('slow');
		else
			$('#divHemocultura').fadeOut('slow');
	});
	
	//Hemo/Orto
	$('#chkHemoculturaAdm').click(function(){
		if(this.checked){
			//$('#rangeHemocultura').fadeIn('slow');
			$('#btnNewHemocultura').fadeIn('slow');
			$('#divHemoculturaDetalhes').fadeIn('slow');
		}
		else{
			//$('#rangeHemocultura').fadeOut('slow');
			$('#btnNewHemocultura').fadeOut('slow');
			$('#divHemoculturaDetalhes').fadeOut('slow').children('input').val('');
		}
	});
	
	$('#chkUroculturaAdm').click(function(){
		if(this.checked){
			//$('#rangeUrocultura').fadeIn('slow');
			$('#btnNewUrocultura').fadeIn('slow');
			$('#divUroculturaDetalhes').fadeIn('slow');
		}
		else{
			//$('#rangeUrocultura').fadeOut('slow');
			$('#btnNewUrocultura').fadeOut('slow');
			$('#divUroculturaDetalhes').fadeOut('slow').children('input').val('');
		}
	});
	
	$('#btnNewHemocultura').click(CriaAmostrasHemo);
	$('#btnNewUrocultura').click(CriaAmostrasUro);
	$(".agentepres").click(AgentePresente);
	$(".agentepres").each(function(){
		$($(this).attr('tardiv')).hide();
	})
	$(".agenteNpres").click(AgenteNaoPresente);
	$(".tipoagente").change(ColocaOutros);
	$('#fimResult').click(CalcularResultado);
}


function CriaAmostrasUro(){
	CiraAmostras($('#divUroculturaDetalhes'),'AgenteUrocultura');
}

function CriaAmostrasHemo(){
	CiraAmostras($('#divHemoculturaDetalhes'),'AgenteHemocultura');
}

//funcao complexa cria amostras 
function CiraAmostras(div,idBase){
	
	//for(var i=1;i<=number;i++){
	console.log("#hdm"+idBase+"N");
	console.log($("#hdm"+idBase+"N"));
	i = parseInt($("#hdm"+idBase+"N").val())+1;
	subdiv = $('<div/>');
	subdiv.append($('<fieldset/>',{
				"data-role":"controlgroup",
				"data-type":"horizontal",
				"data-mini":"true"
			}).append($("<legend/>").text(i+'ª Amostra:')
			).append(
					$('<input/>',{
						 'type': 'radio',
	                    'name': 'chk'+idBase+i,
	                    'id': 'chk'+idBase+i,
	                    'tardiv':'#div'+idBase+i,
	                    'value':"true",
	                    'class':'hemocultura agentepresente'
					}).click(AgentePresente)
				).append(
					$('<label/>',{
						'for':'chk'+idBase+i
					}
					).text("Agente presente")
				).append(
						$('<input/>',{
							 'type': 'radio',
		                    'name': 'chk'+idBase+i,
		                    'id': 'chk'+idBase+i+"N",
		                    'value':"false",
		                    'class':'agenteNpresente',
		                    'tardiv':'#div'+idBase+i
						}).click(AgenteNaoPresente)
				).append(
					$('<label/>',{
						'for':'chk'+idBase+i+"N"
					}
					).text('Agente não presente')
				)
		).append(
			$('<div/>',{
				'id':'div'+idBase+i,
				'data-role':'fieldcontain'
			}).append(
					$('<label/>',{
						'for':'txt'+idBase+i
					}
					).text('Agente:')
				).append(
					$('<select/>',{
						"id":"cmb"+idBase+i,
						"name":"cmb"+idBase+i,
						"required":"required",
						"class":"tipoagente",
						"outros":'#divtxt'+idBase+i
					}).append(
						$('<option/>',{
							"value":0
						}).text("Selecione uma opção")
					).append(
						$('<option/>',{
							"value":1
						}).text("Staphylococcus aureus")
					).append(
						$('<option/>',{
							"value":2
						}).text("Streptococcus viridans")
					).append(
						$('<option/>',{
							"value":3
						}).text("Staphylococcus coagulase negativo")
					).append(
						$('<option/>',{
							"value":4
						}).text("Streptococcus sp.")
					).append(
						$('<option/>',{
							"value":5
						}).text("Enterococcus")
					).append(
						$('<option/>',{
							"value":6
						}).text("Estruturas leveduriformes")
					).append(
						$('<option/>',{
							"value":7
						}).text("Outros")
					).change(ColocaOutros)
				).append(
						$('<div/>',{
							'id':'divtxt'+idBase+i,
							'data-role':'fieldcontain'
						}).append(
							$('<label/>',{
								'for':'txt'+idBase+i
							}
							).text('Nome:')
						).append(
							$('<input/>',{
								 'type': 'text',
			                     'name': 'txt'+idBase+i,
			                     'id': 'txt'+idBase+i
							})
						).hide()
				).hide()
			);
	div.append(subdiv);
	$("#hdm"+idBase+"N").val(i)
	div.trigger('create');
	//}
}


function AgentePresente(){
	if(this.checked){
		$($(this).attr('tardiv')).fadeIn('slow');
		$($(this).attr('tardiv')).parent("div").trigger('create');
	}
}

function AgenteNaoPresente(){
	if(this.checked){
		$($(this).attr('tardiv')).fadeOut('slow');
		$($(this).attr('tardiv')).val('');
	}
}

function ColocaOutros(){
	if(this.value == "7"){
		$($(this).attr('outros')).fadeIn('slow');
		$($(this).attr('outros')).parent("div").trigger('create');
	}
	else{
		$($(this).attr('outros')).fadeOut('slow');
	}
}

function CalcularResultado(){
	$(".result").hide();
	var grupoTeste = BaseDukeP();
	if(!grupoTeste){//ele nao passa nos primeiros criterios para estar nos testes de criterios de duke
		$('#divNaoASuspeita').fadeIn();//não deve chegar aqui
		return;
	}
	
	var critMa =0;
	$('.critMa').each(function(){
		var intcom = this.checked ? 1 : 0;
		console.log(this);
		console.log(intcom);
		critMa = critMa+intcom;
	});
	
	var critme = 0
	$('.critme').each(function(){
		var intcom = this.checked ? 1 : 0;
		console.log(this);
		console.log(intcom);
		critme = critme+intcom;
	});
	
	var total = critme+critMa*2.5
	var hemot =0
	var hemoEx = false;
	$('.hemocultura').each(function(){
		var intcom = this.checked ? 1 : 0;
		hemot = hemot+intcom;
	});
	$('.presentHemo').each(function(){
		if(this.checked )
			hemoEx = true
	});
	console.log(total)
	console.log('hemo'+hemot);
	console.log(hemoEx);
	if(total>=5){//Caminho vermelho
		if(hemot>0)
			$('#divAntibioticoterapia').fadeIn();
		else
			$('#divTerapiaEmpirica').fadeIn();
	}
	else{
		if(hemoEx){//tenho o hemograma?
			if(hemot==0)//nao fecha o hemograma
				$('#divNaoBateComHemoCultura').fadeIn();
			else//hemograma com suspeita
				$('#divTerapiaEmpirica').fadeIn();
		}	
		else //nao tenho hemograma
			$('#divNaoBateSemHemoCultura').fadeIn();
	}
	EnvioDeDados();
}

function EnvioDeDados(){
	var obdata = $.extend({},$('#frmIdentificacao').serializeObject(),$('#frmAvaliacaoClinica').serializeObject(),
			$('#frmCriteriosDukeM').serializeObject(),$('#frmCriteriosDukem').serializeObject(),$('#frmHemoCulturaUrocultura').serializeObject())
	$.ajax({
		type: "POST",
		url: "webservice/sendInfo.php",
		data: obdata
		})
		.done(function( msg ) {
			resp = jQuery.parseJSON(msg);
			//TODO popUp de dados enviados
		});
}

function BaseDukeP(){
	var testaDuke = false
	$('.baseDuke').each(function(){
		if(this.checked)
			testaDuke = true;
	});
	return testaDuke;
}

function ProcuraDadosSUS(){
	var obdata = {};
	if(!TestaSUS(this.value)){
		PopError("Numero do SUS inválido!");
		this.value = "";
		return;
	}
	obdata.sus=this.value
	ProcuraDados(obdata);
}

function ProcuraDadosCPF(){
	var obdata = {};
	if(!TestaCPF(this.value)){
		PopError("CPF inválido!");
		this.value = "";
		return;
	}
	obdata.cpf=this.value
	ProcuraDados(obdata);
}

function ProcuraDados(obdata){
	$.ajax({
		type: "POST",
		url: "webservice/getInfo.php", //TODO IP global ou customizavel
		data: obdata
		})
		.done(function( msg ) {
			resp = jQuery.parseJSON(msg);
			if(resp!=null){
				$('#txtSus').val(resp.numero_sus);
				$('#txtCpf').val(resp.cpf);
				$('#txtNome').val(resp.nome);
				$('#txtIdade').val(resp.idade);
				if(resp.id_sexo == 1)
					$('#rdmSexoM').click().click();
				else if(resp.id_sexo == 2)
					$('#rdmSexoF').click().click();
				$('#txtRegistro').val(resp.registro_hospitalar);
				console.log(resp.id_hospital);
				if(resp.id_hospital == 1)
					$('#rdmHospitalHUOL').click().click();
				else if(resp.id_hospital == 2)
					$('#rdmHospitalHGT').click().click();
				$('#txtEnfermaria').val(resp.enfermaria_leito);
				if(resp.data_internacao!=null){
					d = new Date(resp.data_internacao);
					data = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
					$('#txtDataInternacao').val(data);
				}
				$('#frmIdentificacao').trigger('create');
			}
		});
}



function PopError(msg){
	$('#msgError').text(msg);
	$('#errorPOPUp').popup( "open")
}


