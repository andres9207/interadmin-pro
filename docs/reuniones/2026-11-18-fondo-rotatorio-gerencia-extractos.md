# Reunión con Intervé: fondo rotatorio y control de pagos

**Participantes:** Lucero Bernal Posada (Intervé), Bayron Rojas, Juan Pablo Ospina Vivares, Juan Guillermo Vásquez Mejía, César Roldán.
**Recibida:** 2026-11-18 (transcripción pegada en la conversación con Claude Code).
**Ejemplo de referencia:** el cuadro "Control de pagos" de la obra FLOR - ETAPA 4, constructora Ménsula, que hoy se lleva en Excel.
**Implementado en:** Gerencia extractos ([DEC-103](../../engineering/decisiones/DEC-103-gerencia-extractos-fondo-rotatorio.md)).

Este documento guarda el contexto de la reunión: no es una regla. Lo vigente está en la DEC-103.

## Lo que explicó Lucero

- **El cuadro va por meses**, para decirle al cliente cuánto se gastó cada mes. La primera columna es el mes del acta o del abono.
- **El acta es lo mismo que el extracto.** Cada una trae la fecha del extracto (la del documento que manda el constructor) y la fecha en que Intervé lo aprueba.
- **Fondo rotatorio:** la gerencia define un tope (800, 1.000, 3.000 millones…) y le entrega esa plata al constructor como un anticipo, para que pague sin esperar. El constructor demuestra en qué la gastó con extractos, y se le restituye para que el fondo siga rotando.
- **Saldo del fondo:** empieza en cero si no se entrega nada. Cada acta normal se amortiza al fondo y lo resta; si no se ha entregado plata, el saldo queda negativo: es lo que se le debe al constructor. Ejemplo: el extracto 1 (89 millones) y el 2 (65 millones) dejaron el saldo en −154 millones.
- **Tres tipos (columna de letra):**
  - **A, acta normal** ("normalita"): amortiza completa al fondo. Es lo habitual; no todas las obras tienen actas especiales.
  - **E, acta especial:** cuando ciertas facturas grandes se aprueban para pagarlas directo por la fiducia (Alianza) a los proveedores, para ahorrar el 4 × 1000. Esa plata no se resta del fondo, porque ya se le pagó al proveedor. El constructor cobra los impuestos que le ocasiona el acta (retención en la fuente, reteICA, reteIVA, 4 × 1000…), que **se escriben a mano** porque son una suma de cosas. Valor del acta = lo pagado a los proveedores + esos impuestos. **Solo los impuestos se restan del fondo.**
  - **F, abono al fondo:** la plata que se le entrega al constructor. Un abono paga un acta (el abono 1 pagó el extracto 1, el abono 2 el extracto 2), o es la entrega para llenar el fondo hasta el tope (los 1.000 millones).
- **Un solo fondo por obra** (o por etapa). Lo que puede cambiar es el tope: si no alcanza, se aprueba subirlo a 2.000 o 3.000 millones. No hay varios fondos a la vez.
- **Los abonos son a la obra**, al fondo, no a un contrato.
- **Etapas:** cuando la obra tiene etapas, cada etapa lleva su propio cuadro.
- **Glosas:** el cuadro tiene una columna de glosas porque el sistema anterior no tenía dónde controlarlas. Se numeran por el acta donde se generan y un consecutivo: la glosa 18-1 es la primera del acta 18; en el acta 9, las glosas 09-1, 09-2…

## Decisiones tomadas después, con el usuario

- El reintegro (columnas Reint y Valor del Excel) queda fuera.
- Cada abono paga una sola acta.
- El tope y lo que se le debe al constructor aparecen en el informe.
- Vista nueva "Gerencia extractos", aparte de Extractos.
- El valor del acta sale de las facturas de su extracto; las actas se ven aunque no haya fondo; la etapa sale de la factura.
- La amortización y la retención del acta especial se escriben a mano.
- El número del abono es consecutivo y lo asigna el sistema (2026-11-20).
- El extracto por aprobar llega como acta A, con la fecha de aprobación de sus facturas si todas están aprobadas (2026-11-20).

## Transcripción

Estoy tomando.
¿Cuánto con este PC? Listo, es que estaba mirando que lo guardara en mi computador, no le dañaba el cuadro a la que está trabajando en este y se va a desplegar todas las celditas entonces.
A ver, esto es este es el número, esto es que nosotros los organizamos como por meses para uno poder decirle al cliente este mes me gasté 65000000, este mes me gasté 114000000 cierto, digamos que está la primera columna, es identificando el mes del acta o del abono.
Luego, en esta columna tenemos el acta, el acta acta es lo mismo que extracto.

Juan Pablo Ospina Vivares  8:07
Sí, señora.

Lucero  Bernal Posada  8:14
Entonces acá tenemos, por ejemplo, este es el extracto uno y en ese y para cada extracto tenemos la fecha del extracto, que es la fecha del documento que ustedes mostraron ahorita, como la fecha que tiene el documento que nos manda el constructor, y luego tenemos la fecha en la que nosotros lo aprobamos el extracto.
Y luego tenemos una columnita que nos identifica si es pues como los diferentes valores que voy a incluir acá, cierto, entonces acá nosotros tenemos que es del fondo rotatorio, que es un acta especial y que es un extracto normal.
Entonces, lo que hice F de fondo rotatorio.
Es lo que les había contado la otra vez que cuando yo tengo una construcción, yo le entrego una plata, digamos el propietario o el la gerencia define a yo le voy a entregar a este constructor 3000 millones de pesos para que trabaje con esa plata o 100000000 o 800. Eso es muy variable. Entonces él define como un tope que vamos a tener como fondo rotatorio con esa plata.
El constructor lo que hace es que hace los diferentes pagos para no tener que estar esperando, pues a que uno le gestione la plata, sino que él va facturando de una vez y entonces ya luego nos pasa todo eso que facturó nos lo pasa en un extracto.
Digamos, se gastó esa plata de ese fondo rotatorio. Entonces ya nosotros le restituimos esa plata para que pues para que pueda seguir como con el mismo fondo rotatorio y pueda seguir trabajando. ¿Me entienden? ¿Cómo está ahí esa idea?
O fui a enredar.
Hola.

Bayron  Rojas  10:00
¿Cómo se identifica, señor Lucero, o cómo hacen normalmente la solicitud de que ya digamos se gastaron ese fondo?

Lucero  Bernal Posada  10:06
Eso entonces listo, entonces ya sigamos. Entonces mira acá lo primero que está en este cuadro es el saldo del fondo, no les entregamos nada de plata, o sea, uno inicia al iniciar la obra puede entregarle de una vez la plata al constructor. Entonces desde el principio le entregó a sí, se definió que son 800000000, entonces por ejemplo, en esta obra son 1000.

Bayron  Rojas  10:07
¿Cómo los comunicado estamos?

Lucero  Bernal Posada  10:26
Entonces yo aquí al principio le pude entregar los 1000 millones, pero en este caso no se le entregó nada. Entonces el saldo del fondo es cero, no le entregué plata. Luego él empezó a gastar plata de su bolsillo. Entonces me pasó un extracto número uno el 25 de febrero, lo aprobamos el 18 de abril. Debe ser porque empezamos después en la hora. ¿Quién sabe por qué nos demoramos tanto y entonces?
El valor de ese extracto es de 89000000, esos 89000000 se amortizan al fondo. Es como que siempre la me explico este, como quien dice el fondo rotatorio es un anticipo de plata que yo le entrego al constructor.

Bayron  Rojas  11:08
Okay.

Lucero  Bernal Posada  11:08
Él siempre me tiene que demostrar en qué se gastó esa plata. ¿Entonces, cómo me lo demuestra con un extracto? Entonces acá ponemos el valor del extracto y aquí decimos, bueno, de ese extracto yo lo aprobé todo. Entonces le amortizo todo al fondo. O sea, que esta plata se la tengo que devolver porque se porque ya se la amorticé.
Pero como no le había entregado nada de plata, pues quedó en negativo, le estoy debiendo 89000000, luego entregó un extracto 2, lo mismo con la fecha, lo entregó el 17, el 18 ya lo liberamos, ese este esta acta, que es un acta normal, válida 65000000, le amortizo los 65000000, como no le había sigo sin darle plata, ya le estoy debiendo 100.

Bayron  Rojas  11:50
Estoy acumulando.

Lucero  Bernal Posada  11:51
154000000 luego con la gerencia decimos, venga, hay que hay que darle plata, pues al constructor, lo vamos a avalar listo. Entonces se le abonó, se le hizo un abono uno. Este abono uno fue para pagar este primer extracto, entonces ya quedamos con un saldo del segundo extracto, luego le.

Bayron  Rojas  11:54
Correcto.
Good.

Lucero  Bernal Posada  12:11
Le entregamos el abono 2, el abono 2 también lo mismo con la fecha en que en que lo solicitamos, en que lo aprobamos. Este abono 2 lo usamos para pagar esa.
5, entonces ya quedamos en cero.
Ya luego se dice con la gerencia, bueno, listo, vamos a darle el saldo al fondo para no seguirnos enredando. Ya le entregamos los 1000 millones, entonces ya el saldo al fondo.
Luego él nos pasa un extracto 3, que también es un extracto normal que sea que se amortiza en el fondo. Entonces ese extracto 3 es por 217000 pesitos. Ahí se apuntan y se le van restando a los 1000 millones. Ahí se acabó este mes de abril. Entonces ya sabemos que en este mes el gasto fue de 65 y en el mes pasado fue de 89.
Así vamos siguiendo, pero entonces miren que aquí ya hay uno que dice una e, ¿qué es esto?
Que cuando hay ciertas facturas que son más grandes, se aprueba pagarlas directamente por alianza, por la fiduciaria, por la fiducia. Entonces ya si yo si yo le pago directamente por la fiducia, me ahorro el 4 * 1000. ¿Por qué? Porque si yo no lo hago así.
Entonces tengo que hacer un una transacción adicional. Entonces eso me vale más impuestos. Entonces así se ha se paga directamente por la figura o sea se se le paga al proveedor.
Entonces esta plata, como yo se la pagué directamente al proveedor, no se la puedo restar al fondo rotatorio porque yo ya entregué la plata. Entonces ya ménsula, pues el constructor en este caso era ménsula, no se lo puede pagar. Pues no se lo tengo que pagar porque él no se lo tiene que pagar al proveedor porque el proveedor ya le pagamos directamente.
Pero sí le tenemos que pagar a ménsula los gastos administrativos de impuestos que le ocasiona hacer estos movimientos, pues de esta de esta acta, entonces él nos cobra 273000 pesos en el acta, que son como esos gastos de.
De retef, retefuenta reteiva, mhm.

Juan Pablo Ospina Vivares  14:22
Este.
Esa retención, Esa retención de pagos especiales tiene un porcentaje específico a partir del fondo especial del acta especial, pues un saldo fijo.

Lucero  Bernal Posada  14:33
No, eso lo tiene uno que meter manualmente porque eso es una suma de cosas.
Mira que aquí dice que es una suma de RT fuente, reticar, rete IVA, una cosa que llaman emergencia que es 4 * 1000 pues es los gastos de impuestos que le ocasionen al constructor el acta. Entonces eso lo metemos como un número, eso pues inclusive mira que aquí está la suma de qué es. Son varias cositas que ellos metieron en el acta, entonces la sumamos aquí.

Bayron  Rojas  14:38
Place opens.
Listo.
Mhm, sí, listo.

Lucero  Bernal Posada  15:01
Y entonces el acta en general, este es el acta, está lo que pagamos directamente al a los proveedores más los impuestos que ocasión, pues que nos cobra el constructor. Eso da el valor del acta, cierto, sumando estos 2 nos da este valor.

Bayron  Rojas  15:10
Yeah.
Ahí veo que la ese esa retención sí le resta.
Al fondo.

Lucero  Bernal Posada  15:26
Sí, te lo eso, te lo único que le resta al fondo son estos impuestos, que es lo único que yo no le pagaba al constructor. ¿Qué es lo que le tengo que pagar entonces ese si viene a restar aquí al fondo rotatorio?

Bayron  Rojas  15:37
Read.

Lucero  Bernal Posada  15:38
Pero entonces luego sigue un acta. Mira que aquí sigue un acta que es normalita. Entonces, cuando es un acta normalita, amortiza completica al fondo.

Bayron  Rojas  15:42
Remasad a seco rato.
Correcto miss.

Lucero  Bernal Posada  15:48
Y ya Y ya luego puedo hacer otros pagos, entonces ya le voy pagando. Sí, aquí le pagué el acta esta acta esta acta 3. Por aquí le pagamos estos impuestos de del acta cuatro, por aquí le pagamos esta acta 5. Entonces ya volvimos a quedar en 1.

Bayron  Rojas  16:09
Este señor.

Lucero  Bernal Posada  16:09
Y ya luego nos pasa otra acta y así sucesivamente hasta el infinito y nada más allá.

Bayron  Rojas  16:13
Yeah.
Lo que abre la obra es, eso era no dar.

Lucero  Bernal Posada  16:17
Sí, pero eso es como el procedimiento.

Bayron  Rojas  16:21
Ya con eso queda claro.
Esto no, realmente lo que vamos a hacer es como la opción para que usted pueda, digamos, entregar primero el saldo inicial, cierto, si van a entregar saldo inicial, cierto, antes de que empiecen, me imagino que el proyecto y ya pues el registro realmente lo que necesitamos es como el registro de abonos, que si va a ser un abono tipo.

Lucero  Bernal Posada  16:32
Sí.
Sí.
Sí.

Bayron  Rojas  16:44
¿Cuál es 2 tipos arriba si no lo son?
¿Tenemos el tipo F que es el del fondo, cierto?

Juan Pablo Ospina Vivares  16:50
El fondo retatorio especial y actas.

Lucero  Bernal Posada  16:50
Sí, mira aquí fondo rotatorio especial y antes.

Bayron  Rojas  16:55
Listo, y en especial también y que le indiques especial a que apta.
Bueno, tenemos listo, correcto, eso no, ya quedó claro.

Juan Pablo Ospina Vivares  17:12
Yo tengo ahí una pregunta, por ejemplo, la primera parte yo tengo.

Lucero  Bernal Posada  17:14
Sí.

Juan Pablo Ospina Vivares  17:20
El contratista hizo pues un acta normal, cierto, y usted se le está debiendo en estos momentos el contratista se para en el acta 2, cierto, y en el fondo rotatorio obviamente pues se le paga al contratista, pero yo puedo generar diferentes fondos rotatorios para sumar el total.

Lucero  Bernal Posada  17:24
Sí.
G.
Sí.

Juan Pablo Ospina Vivares  17:40
De la primera.

Lucero  Bernal Posada  17:40
No es solamente un fondo rotatorio. Lo que puede variar es que aumente o disminuya el valor del valor. Lo que sí puede pasar es que yo diga al principio de la obra definimos que le íbamos a dar 1000 millones de fondo rotatorio. Uy, pero ya se nos volvió un voleo de facturas y ya no alcanza con esos 1000. Entonces se aprueba aumentar.
El tope del fondo rotatorio a 2000 o a 3000 millones. Eso sí puede pasar, que se cambie el tope, pero no, pero no que haya varios.

Bayron  Rojas  18:13
¿Listos de nuevo, Lucero, pero en otro ya es le estaríamos respondiendo para cuándo quedaría este ajuste, cierto, este informe realmente y cómo sería, digamos, que nos reuníamos?
Bueno, de cómo se haría el registro y cómo va a salir este informe de forma automática.

Lucero  Bernal Posada  18:31
Listos.

Bayron  Rojas  18:32
Estoy realmente los abonos siempre es a la obra, no a un contrato, cierto directamente con la obra.

Lucero  Bernal Posada  18:38
Sí, los abonos, los abonos es abonos al fondo.

Bayron  Rojas  18:42
I want to listo.
Y eso lo hacen por ahora, cierto, esto informal.

Lucero  Bernal Posada  18:49
Sí, cada obra tiene su informe, ajá, y no todas las obras tienen, por ejemplo, actas especiales, pues a veces son solamente actas normales. Sí, solo funcionan cuando relatorio.

Bayron  Rojas  18:49
Por ahora en la que separados, correr, por ahora y correcto.
Bueno, como se sabe una obra tiene tapa, cierto, para eso de tapa.

Lucero  Bernal Posada  19:07
Etapas.

Bayron  Rojas  19:09
Listo por etapa, si tiene etapas preguntas, es una obra que no tiene etapa y lo que es completa.

Lucero  Bernal Posada  19:10
Sí.
No, eso de las etapas, sí, no, ay, mira.

Bayron  Rojas  19:16
The reason.
Is so correct?
No, estaré ganando cero, no hay problema.

Lucero  Bernal Posada  19:24
¿Cuando es por etapas son centros de cosas diferentes? Sí, cuando es por etapas, sí, son tienen que ser un cuadro aparte para cada etapa. Sí, sí.

Bayron  Rojas  19:32
Un cuadro por etapa en el correcto.
Listo, perfecto, la demás.
Ya con eso nos quedó claro ya el proceso, entonces estaremos pues ya informando, señores solo con lo que había visto esta partecita.

Lucero  Bernal Posada  19:54
Listo, súper.

Bayron  Rojas  19:54
No sé.
Como si no sé si hay alguna otra robación por parte.
área.

Lucero  Bernal Posada  20:03
Shakhya, will you write it?

Bayron  Rojas  20:03
De Juan Guillermo.

Lucero  Bernal Posada  20:06
Outlook.
En Juan.

Juan Guillermo  Vasquez Mejia  20:09
Todo claro, tengo que aprender a manejar el programa, pero todo claro.

Lucero  Bernal Posada  20:10
O.
No, it's just fine. I mean, I mean, I mean, no, no.

Bayron  Rojas  20:14
Listo, perfecto. No sé, señora Lucero, si este informe veo que tiene la columna de glosa, ¿tienes alguno que tenga? ¿Qué información le sale?

Juan Guillermo  Vasquez Mejia  20:16
Set.

Lucero  Bernal Posada  20:18
O sea, este man.
And.
Sí, no, pero eso es porque como nosotros, como nosotros en la webpack no teníamos donde controlarlo, lo controlábamos aquí.

Bayron  Rojas  20:31
Listo, entonces ahí ponemos todas las glosas que hayan generado en este estrato o que sería en el caso.

Lucero  Bernal Posada  20:32
Incluso, incluso miren que esa otra pestaña.
Mira que, por ejemplo, en esta otra pestaña tenemos lo que nos da la web.

Bayron  Rojas  20:44
Listo.

Lucero  Bernal Posada  20:44
Porque como para poder para poder encontrar las glosas, mira antes, por ejemplo, aquí sumando estas cosas nos daba distinto a lo que pasó el constructor. Entonces teníamos una glosa, pero era por llevar el control en alguna parte porque no teníamos.

Bayron  Rojas  20:58
Deseo un deseo.

Juan Pablo Ospina Vivares  20:59
De igual forma.

Lucero  Bernal Posada  20:59
Pero no tiene que estar ahí, pues aquí en el cuaderno nacional.

Juan Pablo Ospina Vivares  21:03
Okay.
De igual forma, aunque dale.
De igual forma, en el reporte nosotros también generamos esa misma columna de glosas cuando se crea la glosa en sobre qué factura y quién la libera, pues qué factura la libera, que hay una opción que yo la asocio, cierto.

Lucero  Bernal Posada  21:15
Listo.
sí.
sí.
La numeración de las glosas la hacemos nosotros regularmente. Por ejemplo, mira, esta glosa se llama 18 guión, uno. ¿Por qué? Porque se generó en el acta 18 y es la primera glosa, cierto? Y si hay varias glosas que no hay ningún ejemplo, que esta hora está muy cortita todavía, pero por ejemplo, si en el.
A 9 se generan varias, entonces es la glosa cero 9 guión uno, la glosa cero 9 guión 2, pues para uno identificar en qué acta se genera y como para tener como un consecutivo.

Bayron  Rojas  21:59
This is no problem.
No, ya eso sería, pues, señor Locero de parte de nosotros, pues ya hacemos el análisis con las notas que tomamos de esta reunión y procedemos a hacer el ajuste al desarrollo para que quede solista también y aplicado.

Lucero  Bernal Posada  22:15
Listo.
Listo, muchísimas gracias.

Bayron  Rojas  22:19
Usted prede espacio sin aluncero.
Tengan una más feliz tarde a todos.

Lucero  Bernal Posada  22:25
Gracias.

César Roldán  22:25
Muchas gracias, muy bien, muy amable por el espacio. Hasta luego, feliz tarde, gracias.

Juan Guillermo  Vasquez Mejia  22:26
No, gracias.

Juan Pablo Ospina Vivares  22:26
Hasta luego.

Lucero  Bernal Posada  22:27
Se lo digo, que estén bien, chao, muchas gracias.

Juan Pablo Ospina Vivares  22:28
I love to.

Juan Guillermo  Vasquez Mejia  22:28
No.
Estoy muy bien, chao chao.

Bayron  Rojas  22:31
Hello.

Juan Guillermo  Vasquez Mejia  22:32
Chao.

Lucero  Bernal Posada  22:33
Chao, gracias.

Bayron  Rojas  22:35
What is all?
