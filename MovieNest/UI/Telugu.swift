//
//  Telugu.swift
//  MovieNest
//
//  Created by Samanyu on 03/03/25.
//

import SwiftUI

struct Telugu: View {
    @State var title = "Telugu Movies"
    @State var posters: [String] = ["telugu1", "telugu2","telugu3", "telugu4", "telugu5", "telugu6", "telugu7"]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 20.0){
            
            Text(title)
                .font(.title2)
                .foregroundColor(.white)
                .fontWeight(.bold)
                .padding(.horizontal, 20)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 20.0) {
                    ForEach(posters.indices, id: \.self) {index in
                        Image(posters[index])
                            .resizable()
                            .frame(width:130, height: 180)
                            .cornerRadius(20)
                    }
                }
                .offset(x: 20)
                .padding(.trailing, 40)
            }
        }
    }
}
    struct Telugu_Previews: PreviewProvider {
        static var previews: some View {
            Telugu()
        }
    }
