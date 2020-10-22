from datetime import datetime

# official paper http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/ARTICLES/mt.pdf 
# wiki page with pseudocode https://en.wikipedia.org/wiki/Mersenne_Twister


# coefficients for MT19937 as defined by the creators
(w, n, m, r) = (32, 624, 397, 31)
a = 0x9908B0DF
(u, d) = (11, 0xFFFFFFFF)
(s, b) = (7, 0x9D2C5680)
(t, c) = (15, 0xEFC60000)
l = 18
f = 1812433253
max = 4294967295 #this is the maximum size the numbers can get. 
                 #Divide the outcome by this to get a number between 0 and 1


# make a array to store the state of the generator
MT = [0 for i in range(n)]
index = n+1
lower_mask = 0xFFFFFFFF #int(bin(1 << r), 2) - 0b1
upper_mask = 0x00000000 #int(str(-~lower_mask)[-w:])


# initialize the generator from a seed (fill the array)
# if no seed is provided the current time in microseconds is used
def mt_seed(seed = datetime.now().microsecond):
    print('This is the seed: ' + str(seed))
    # global index
    # index = n
    MT[0] = seed
    for i in range(1, n):
        #exponentiation and bitshifts are used to get numbers for the array
        temp = f * (MT[i-1] ^ (MT[i-1] >> (w-2))) + i
        #bits are reversed and then put into the array
        MT[i] = temp & 0xffffffff


# Extract a tempered value based on MT[index]
# calling twist() every n numbers
def extract_number():
    global index
    if index >= n:
        twist()
        index = 0

    #these bitshifts are done to spread the numbers out
    y = MT[index]
    y = y ^ ((y >> u) & d)
    y = y ^ ((y << t) & c)
    y = y ^ ((y << s) & b)
    y = y ^ (y >> l)

    index += 1
    return y & 0xffffffff


# Generate the next n values from the series x_i when the first array is exhausted
def twist():
    global index
    for i in range(0, n):
        x = (MT[i] & upper_mask) + (MT[(i+1) % n] & lower_mask)
        xA = x >> 1
        if (x % 2) != 0:
            xA = xA ^ a
        MT[i] = MT[(i + m) % n] ^ xA

def return_boolean():
    new_bool = int(extract_number()/max*2)
    if new_bool == 1:
        return True
    if new_bool == 0:
        return False



if __name__ == '__main__':
    mt_seed()
    for i in range(0,100):
        print(extract_number()/max*100)
    for i in range(1,101):
        if (i % 5 == 0):
            print(return_boolean())
        else: 
            print(return_boolean(), end= " ")


    
