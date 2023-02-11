
# Общие константы
SOCKETS = (
    #Intel sockets
    ('LGA1155', 'LGA1155'),
    ('LGA2011', 'LGA2011'),
    ('LGA2011-v3', 'LGA2011-v3'),
    ('LGA1356', 'LGA1356'),
    ('LGA1150', 'LGA1150'),
    ('LGA1151', 'LGA1151'),
    ('LGA2066', 'LGA2066'),
    ('LGA1200', 'LGA1200'),
    ('LGA1700', 'LGA1700'),
    #AMD
    ('AM3', 'AM3'),
    ('AM3+', 'AM3+'),
    ('FM1', 'FM1'),
    ('FM2', 'FM2'),
    ('FM2+', 'FM2+'),
    ('AM1', 'AM1'),
    ('AM4', 'AM4'),
    ('TR4', 'TR4'),
    ('sTRX4', 'sTRX4'),
    ('sWRX8', 'sWRX8'),
    ('AM5', 'AM5'),
)

# Константы материнских плат
MOTHER_BOARD_FORM_FACTOR = (
    ('AT', 'AT'),
    ('Baby-AT', 'Baby-AT'),
    ('ATX', 'ATX'),
    ('Mini-ATX', 'Mini-ATX'),
    ('microATX', 'microATX'),
    ('LPX ', 'LPX '),
    ('NLX', 'NLX'),
    ('microNLX', 'microNLX'),
)

# Константы процессоров

PROCESSORS_MANUFACTURER = (
    ('Intel', 'Intel'),
    ('AMD', 'AMD'),
)

PROCESSORS_PACKAGE = (
    ('OEM', 'OEM'),
    ('BOX', 'BOX'),
)

PROCESSORS_GENERATIONS = (
    # Intel
    ('Celeron', 'Celeron'),
    ('Pentium', 'Pentium'),
    ('i3', 'i3'),
    ('i5', 'i5'),
    ('i7', 'i7'),
    ('i9', 'i9'),
    ('Xeon', 'Xeon'),
    # AMD
    ('Athlon', 'Athlon'),
    ('FX', 'FX'),
    ('Ryzen 3', 'Ryzen 3'),
    ('Ryzen 5', 'Ryzen 5'),
    ('Ryzen 7', 'Ryzen 7'),
    ('Ryzen 9', 'Ryzen 9'),
    ('Threadripper', 'Threadripper'),
)

PROCESSORS_TYPE_RAM = (
    ('DDR1', 'DDR1'),
    ('DDR2', 'DDR2'),
    ('DDR3', 'DDR3'),
    ('DDR4', 'DDR4'),
)

# Константы видеокарт
VIDEOCARD_MANUFACTURER = (
    ('NVIDIA', 'NVIDIA'),
    ('ATI', 'ATI'),
)

VIDEOCARD_TYPE_OF_MEMORY = (
    ('GDDR2', 'GDDR2'),
    ('GDDR3', 'GDDR3'),
    ('GDDR4', 'GDDR4'),
    ('GDDR5', 'GDDR5'),
)

# Константы ОЗУ
RAM_TYPE = (
    ('SIMM', 'SIMM'),
    ('DIMM', 'DIMM'),
    ('DDR', 'DDR'),
    ('DDR2', 'DDR2'),
    ('DDR3', 'DDR3'),
    ('DDR4', 'DDR4'),
    ('DDR5', 'DDR5'),
)

RAM_FORM_FACTOR = (
    ('DIMM', 'DIMM'),
    ('SO-DIMM', 'SO-DIMM'),
    ('RDIMM', 'RDIMM'),
)

#Константы ПЗУ
ROM_INTERFACE = (
    ('SATA II', 'SATA II'),
    ('SATA III', 'SATA III'),
)

ROM_FORM_FACTOR = (
    ('2.5', '2.5'),
    ('3.5', '3.5'),
)

#Константы SSD
SSD_INTERFACE = (
    ('SATA 3', 'SATA 3'),
    ('SATA 2', 'SATA 2'),
    ('PCI-E 3.x x2', 'PCI-E 3.x x2'),
    ('PCI-E 3.x x4', 'PCI-E 3.x x4'),
    ('PCI-E 4.0 x4', 'PCI-E 4.0 x4'),
    ('mSATA', 'mSATA'),
    ('M.2', 'M.2'),
    ('SAS', 'SAS'),
    ('U.2', 'U.2'),
)

SSD_FORM_FACTOR = (
    ('2.5', '2.5'),
    ('3.5', '3.5'),
    ('mSATA', 'mSATA'),
    ('2230', '2230'),
    ('2242', '2242'),
    ('2260', '2260'),
    ('2280', '2280'),
    ('HHHL ', 'HHHL'),
)

SSD_M2_KEY = (
    ('M', 'M'),
    ('B', 'B'),
    ('B&M', 'B&M'),
)

SSD_BITS_PER_CELL = (
    ('MLC', 'MLC'),
    ('TLC', 'TLC'),
    ('QLC', 'QLC'),
)

SSD_STRUCTURE_MEMORY = (
    ('2D NAND', '2D NAND'),
    ('3D NAND', '3D NAND'),
    ('3D XPoint', '3D XPoint'),
)

# Константы для кулера
COOLER_TYPE = (
    ('Горизонтальный', 'Горизонтальный'),
    ('Башенный', 'Башенный'),
    ('Горизонтально-башенный', 'Горизонтально-башенный'),
)