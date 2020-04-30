import xlrd
import MySQLdb

# Open the workbook and define the worksheet
book = xlrd.open_workbook("../documentos/peticiones.xlsx")
sheet = book.sheet_by_name("Pedidos")

# Establish a MySQL connection
database = MySQLdb.connect (host="localhost", user = "usuario", passwd = "password", db = "nombre_bd")

# Get the cursor, which is used to traverse the database, line by line
cursor = database.cursor()

# Create the INSERT INTO sql query
query = """INSERT INTO pedidos (fecha_hora,solicitante,tlf_solicitante,correo,unidades,servicio,denominacion,localidad,provincia,codigo_postal,direccion_entrega,horario,contacto,tlf_contacto,asignado,entregado,anulacion,motivo_anulacion,anulador,observaciones) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""

# Create a For loop to iterate through each row in the XLS file, starting at row 2 to skip the headers
for r in range(1, sheet.nrows):
		fecha_hora = sheet.cell(r,0).value
		solicitante = sheet.cell(r,1).value
		tlf_solicitante = sheet.cell(r,2).value
		correo = sheet.cell(r,3).value
		unidades = sheet.cell(r,4).value
		servicio = sheet.cell(r,5).value
		denominacion = sheet.cell(r,6).value
		localidad = sheet.cell(r,7).value
		provincia = sheet.cell(r,8).value
		codigo_postal = sheet.cell(r,9).value
		direccion_entrega = sheet.cell(r,10).value
		horario = sheet.cell(r,11).value
		contacto = sheet.cell(r,12).value
		tlf_contacto = sheet.cell(r,13).value
		asignado = sheet.cell(r,14).value
		entregado = sheet.cell(r,15).value
		anulacion = sheet.cell(r,16).value
		motivo_anulacion = sheet.cell(r,17).value
		anulador = sheet.cell(r,18).value
		observaciones = sheet.cell(r,19).value

		# Assign values from each row
		values = (fecha_hora,solicitante,tlf_solicitante,correo,unidades,servicio,denominacion,localidad,provincia,codigo_postal,direccion_entrega,horario,contacto,tlf_contacto,asignado,entregado,anulacion,motivo_anulacion,anulador,observaciones)

		# Execute sql Query
		cursor.execute(query, values)

# Close the cursor
cursor.close()

# Commit the transaction
database.commit()

# Close the database connection
database.close()

# Print results
print ("")
print ("Hecho, todo correcto! Bye, for now.")
print ("")
columns = str(sheet.ncols)
rows = str(sheet.nrows)
print ("He importado " + columns + " columnas y " + rows + " filas a MySQL!")
