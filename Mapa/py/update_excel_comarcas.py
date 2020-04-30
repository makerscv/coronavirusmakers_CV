import xlrd
import MySQLdb

# Open the workbook and define the worksheet
book = xlrd.open_workbook("../documentos/muncomcas.xls")
sheet = book.sheet_by_name("comarcas")

# Establish a MySQL connection
database = MySQLdb.connect (host="localhost", user = "usuario", passwd = "password", db = "nombre_bd")

# Get the cursor, which is used to traverse the database, line by line
cursor = database.cursor()

# Create the INSERT INTO sql query

# Create a For loop to iterate through each row in the XLS file, starting at row 2 to skip the headers
for r in range(0, sheet.nrows):
		id = sheet.cell(r,0).value
		codigo_postal = sheet.cell(r,1).value
		poblacion = sheet.cell(r,2).value
		comarca = sheet.cell(r,3).value
		provincia = sheet.cell(r,4).value

		# Assign values from each row
		query = """UPDATE comarcas_bien SET comarca=%s,provincia=%s WHERE poblacion=%s"""

		values = (comarca, provincia, poblacion)

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
